import plain from './plain.js';
import stylish from './stylish.js';

const getFormatter = (diff, format) => {
  switch (format) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    default:
      return 'check help "gendiff -h" and choose correct "format"';
  }
};

export default getFormatter;
