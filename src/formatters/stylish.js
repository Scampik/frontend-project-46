import _ from 'lodash';

const stringify = (value, depth, spacesCount = 1) => {
  const replacer = '  ';
  const indentSize = depth * spacesCount;
  const currentIndent = replacer.repeat(indentSize);
  const bracketIndent = replacer.repeat(indentSize - spacesCount - 1);
  if (!_.isObject(value) || value === null) {
    return `${value}`;
  }

  const lines = Object
    .entries(value)
    .map(([key, val]) => `${currentIndent}${key}: ${stringify(val, depth + 2)}`);

  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n');
};

const stylish = (data, depth = 1, spacesCount = 1) => {
  const replacer = '  ';
  const indentSize = depth * spacesCount;
  const currentIndent = replacer.repeat(indentSize);
  const bracketIndent = replacer.repeat(indentSize - spacesCount);
  const str = data.map((key) => {
    // console.log(key);
    switch (key.dif) {
      case 'obj':
        return `${currentIndent}  ${key.key}: ${stylish(key.children, depth + 2, 1)}`;
      case 'added':
        return `${currentIndent}+ ${key.key}: ${stringify(key.value, depth + 3)}`;
      case 'deleted':
        return `${currentIndent}- ${key.key}: ${stringify(key.value, depth + 3)}`;
      case 'changed':
        return `${currentIndent}- ${key.key}: ${stringify(key.value1, depth + 3)}\n${currentIndent}+ ${key.key}: ${stringify(key.value2, depth + 3)}`;
      case 'unchanged':
        return `${currentIndent}  ${key.key}: ${stringify(key.value, depth + 3)}`;
      default:
        return 'ERROR';
    }
  });
  const result = [
    '{',
    ...str,
    `${bracketIndent}}`,
  ].join('\n');
  return result;
};

export default stylish;
