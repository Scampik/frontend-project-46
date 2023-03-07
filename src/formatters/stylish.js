import _ from 'lodash';

const getIndent = (depth) => {
  const replacer = '  ';
  const spacesCount = 2;
  const indentSize = depth * spacesCount;
  const currentIndent = replacer.repeat(indentSize - 1);
  const bracketIndent = replacer.repeat(indentSize - spacesCount);
  return [currentIndent, bracketIndent];
};

const stringify = (value, depth) => {
  const [currentIndent, bracketIndent] = getIndent(depth);
  if (!_.isObject(value) || value === null) {
    return String(value);
  }

  const lines = Object
    .entries(value)
    .map(([key, val]) => `${currentIndent}  ${key}: ${stringify(val, depth + 1)}`);

  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n');
};

const stylish = (diff, depth = 1) => {
  const [currentIndent, bracketIndent] = getIndent(depth);
  const str = diff.map((key) => {
    switch (key.type) {
      case 'obj':
        return `${currentIndent}  ${key.key}: ${stylish(key.children, depth + 1)}`;
      case 'added':
        return `${currentIndent}+ ${key.key}: ${stringify(key.value, depth + 1)}`;
      case 'deleted':
        return `${currentIndent}- ${key.key}: ${stringify(key.value, depth + 1)}`;
      case 'changed':
        return [`${currentIndent}- ${key.key}: ${stringify(key.value1, depth + 1)}`,
          `\n${currentIndent}+ ${key.key}: ${stringify(key.value2, depth + 1)}`].join('');
      case 'unchanged':
        return `${currentIndent}  ${key.key}: ${stringify(key.value, depth + 1)}`;
      default:
        throw new Error(`Wrong type ${key.type}`);
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
