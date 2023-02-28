import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

const getFormatter = (diff, format) => {
  switch (format) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    case 'json':
      return json(diff);
    default:
      throw new Error(`\x1b[33mwrong format '${format}', check help "gendiff -h" and choose correct "format"\x1b[0m`);
  }
};

export default getFormatter;
