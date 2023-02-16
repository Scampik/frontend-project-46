import findDiff from './difference.js';
import readFile from './parsers.js';
import getFormatter from './formatters/index.js';

const genDiff = (filepath1, filepath2, format) => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);
  const diff = findDiff(file1, file2);
  const res1 = getFormatter(diff, format);
  return res1;
};

export default genDiff;
