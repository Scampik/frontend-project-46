import _ from 'lodash';

const stringify = (value) => {
  if (typeof (value) === 'string') {
    return `'${value}'`;
  }
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return `${value}`;
};

const plain = (diff, path = []) => {
  const str = diff
    .filter((child) => child.type !== 'unchanged')
    .map((node) => {
      const pathKey = [path, node.key].join('');
      switch (node.type) {
        case 'obj':
          return `${plain(node.children, `${pathKey}.`)}`;
        case 'added':
          return `Property '${pathKey}' was added with value: ${stringify(node.value)}`;
        case 'deleted':
          return `Property '${pathKey}' was removed`;
        case 'changed':
          return `Property '${pathKey}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
        default:
          throw new Error(`Wrong type ${node.type}`);
      }
    });
  const result = [...str].join('\n');
  return result;
};

export default plain;
