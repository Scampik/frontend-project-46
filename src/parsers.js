import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

const getPath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => {
  const file = fs.readFileSync(getPath(filepath));
  const format = path.extname(filepath);
  switch (format) {
    case '.json':
      return JSON.parse(file);
    case '.yml':
      return yaml.load(file);
    default:
      return console.log('takogo formata net');
  }
};

export default readFile;
