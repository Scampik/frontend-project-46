import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test.each(['json', 'yml'])('test(%s)', (extension) => {
  const filepath1 = getFixturePath(`file1.${extension}`);
  const filepath2 = getFixturePath(`file2.${extension}`);
  expect(genDiff(filepath1, filepath2)).toEqual(readFile('expectStylish.txt'));
  expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(readFile('expectStylish.txt'));
  expect(genDiff(filepath1, filepath2, 'plain')).toEqual(readFile('expectPlain.txt'));
  expect(() => JSON.parse(genDiff(filepath1, filepath2, 'json'))).not.toThrow();
});
