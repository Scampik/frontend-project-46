import _ from 'lodash';

const stringify = (value, depth, spacesCount = 4) => {
  const replacer = ' ';
  const indentSize = depth * spacesCount;
  const currentIndent = replacer.repeat(indentSize);
  const bracketIndent = replacer.repeat(indentSize - spacesCount);
  if (!_.isObject(value) || value === null) {
    return `${value}`;
  }

  const lines = Object
    .entries(value)
    .map(([key, val]) => `${currentIndent}${key}: ${stringify(val, depth + 1)}`);

  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n');
};

const stylish = (diff, depth = 1, spacesCount = 0) => {
  const replacer = '  ';
  const indentSize = depth + spacesCount;
  const currentIndent = replacer.repeat(indentSize);
  const bracketIndent = replacer.repeat(indentSize - 1);
  const str = diff.map((key) => {
    // console.log(key);
    switch (key.dif) {
      case 'obj':
        return `${currentIndent}  ${key.key}: ${stylish(key.children, depth + 1, spacesCount + 1)}`;
      case 'added':
        return `${currentIndent}+ ${key.key}: ${stringify(key.value, depth + 1)}`;
      case 'deleted':
        return `${currentIndent}- ${key.key}: ${stringify(key.value, depth + 1)}`;
      case 'changed':
        return `${currentIndent}- ${key.key}: ${stringify(key.value1, depth + 1)}\n${currentIndent}+ ${key.key}: ${stringify(key.value2, depth + 1)}`;
      case 'unchanged':
        return `${currentIndent}  ${key.key}: ${stringify(key.value, depth + 1)}`;
      default:
        throw new Error('Error?');
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
