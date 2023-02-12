import _ from 'lodash';
import findDiff from './difference.js';
import stylish from './formatters/stylish.js';
import readFile from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);
  const result = findDiff(file1,file2);
  const res1 = stylish(result);         //nado budet popravit'
  console.log(res1);
  return res1;
};

export default genDiff;
