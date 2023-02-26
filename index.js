import findDiff from './src/difference.js';
import readFile from './src/parsers.js';
import getFormatter from './src/formatters/index.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);
  const difference = findDiff(file1, file2);
  return getFormatter(difference, format);
};

export default genDiff;
