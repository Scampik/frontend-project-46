import path from 'path';
import fs from 'fs';
import findDiff from './difference.js';
import getParse from './parsers.js';
import getFormatter from './formatters/index.js';

const getPath = (filepath) => path.resolve(process.cwd(), filepath);

const getData = (filepath) => fs.readFileSync(getPath(filepath));

const getFormat = (filepath) => path.extname(filepath);

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const file1 = getParse(getData(filepath1), getFormat(filepath1));
  const file2 = getParse(getData(filepath2), getFormat(filepath2));
  const difference = findDiff(file1, file2);
  return getFormatter(difference, format);
};

export default genDiff;
