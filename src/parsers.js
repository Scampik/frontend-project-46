import yaml from 'js-yaml';

const getParse = (data, extension) => {
  switch (extension) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
    case 'yaml':
      return yaml.load(data);
    default:
      throw new Error(`wrong format: ${extension}`);
  }
};

export default getParse;
