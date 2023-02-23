import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('testDefaulthFormat', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(readFile('expectStylish.txt'));
});
test('testStylishFormat', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish')).toEqual(readFile('expectStylish.txt'));
});
test('testPlainFormat', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toEqual(readFile('expectPlain.txt'));
});
test('testJsonFormat', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json')).toEqual(readFile('expectJson.txt'));
});
