import yaml from 'js-yaml';

const getParse = (fileData, format) => {
  switch (format) {
    case '.json':
      return JSON.parse(fileData);
    case '.yml':
      return yaml.load(fileData);
    default:
      throw new Error(`\x1b[33mwrong format file '${format}', use  only JSON or YAML\x1b[0m`);
  }
};

export default getParse;
