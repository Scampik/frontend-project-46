import _ from 'lodash';
import readFile from './parsers.js';

const getKeys = (data) => Object.keys(data);

const genDiff = (filepath1, filepath2) => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);
  const keys = _.union(getKeys(file1), getKeys(file2));
  const sortKeys = _.sortBy(keys);
  const added = '+ ';
  const deleted = '- ';
  const unchanged = '   ';
  const difference = sortKeys.map((key) => {
    let temp = '';
    if (!Object.hasOwn(file1, key)) {
      temp += `${added} ${key}: ${file2[key]}`;
    } else if (!Object.hasOwn(file2, key)) {
      temp += `${deleted} ${key}: ${file1[key]}`;
    } else if (file1[key] !== file2[key]) {
      temp += `${deleted} ${key}: ${file1[key]} \n  `;
      temp += `${added} ${key}: ${file2[key]}`;
    } else {
      temp += `${unchanged}${key}: ${file1[key]}`;
    }
    return temp;
  });

  const result = `{\n  ${difference.join('\n  ')} \n}`;
  console.log(result);
  return result;
};

export default genDiff;
