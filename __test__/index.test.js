import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('notCauseError', () => {
  expect(() => JSON.parse(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json'))).not.toThrow();
});

test.each([
  ['file1.json', 'file2.json', 'stylish', 'expectStylish.txt'],
  ['file1.json', 'file2.json', 'plain', 'expectPlain.txt'],
  ['file1.yml', 'file2.yml', 'stylish', 'expectStylish.txt'],
  ['file1.yml', 'file2.yml', 'plain', 'expectPlain.txt'],
])('test(%s, %s)', (file1, file2, format, expectFile) => {
  const data = genDiff(getFixturePath(file1), getFixturePath(file2), format);
  expect(data).toEqual(readFile(expectFile));
});
