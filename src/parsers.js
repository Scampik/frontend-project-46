import yaml from 'js-yaml';

const getParse = (fileData, format) => {
  switch (format) {
    case '.json':
      return JSON.parse(fileData);
    case '.yml':
      return yaml.load(fileData);
    default:
      throw new Error('wrong format file, use only JSON or YAML');
  }
};

export default getParse;
