import findDiff from './difference.js';
import readFile from './parsers.js';
import getFormatter from './formatters/index.js';

const genDiff = (filepath1, filepath2, format) => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);
  const difference = findDiff(file1, file2);
  return getFormatter(difference, format);
};

export default genDiff;
