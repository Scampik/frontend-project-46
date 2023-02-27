import _ from 'lodash';

const stringify = (value) => {
  if (typeof (value) === 'string') {
    return `'${value}'`;
  }
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const plain = (diff, pathKey = '') => {
  const str = diff
    .filter((child) => child.dif !== 'unchanged')
    .map((child) => {
      const { key, value, dif } = child;
      const path = [pathKey, key].join('');
      switch (dif) {
        case 'obj':
          return `${plain(child.children, `${path}.`)}`;
        case 'added':
          return `Property '${path}' was added with value: ${stringify(value)}`;
        case 'deleted':
          return `Property '${path}' was removed`;
        case 'changed':
          return `Property '${path}' was updated. From ${stringify(child.value1)} to ${stringify(child.value2)}`;
        case 'unchanged':
          return '';
        default:
          throw new Error('ERROR');
      }
    });
  const result = [...str].join('\n');
  return result;
};

export default plain;
