import yaml from 'js-yaml';

const getParse = (fileData, extension) => {
  switch (extension) {
    case 'json':
      return JSON.parse(fileData);
    case 'yml':
    case 'yaml':
      return yaml.load(fileData);
    default:
      throw new Error(`wrong format file ${extension}`);
  }
};

export default getParse;
