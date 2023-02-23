import _ from 'lodash';

const getValue = (value) => {
  if (typeof (value) === 'string') {
    return `'${value}'`;
  }
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const plain = (diff, pathKey = '') => {
  const str = diff.filter((child) => child.dif !== 'unchanged')
    .map((child) => {
      const { key, value, dif } = child;
      const path = pathKey + key;
      switch (dif) {
        case 'obj':
          return `${plain(child.children, `${path}.`)}`;
        case 'added':
          return `Property '${path}' was added with value: ${getValue(value)}`;
        case 'deleted':
          return `Property '${path}' was removed`;
        case 'changed':
          return `Property '${path}' was updated. From ${getValue(child.value1)} to ${getValue(child.value2)}`;
        case 'unchanged':
          return '';
        default:
          return 'ERROR';
      }
    });
  const result = [...str].join('\n');
  return result;
};

export default plain;
