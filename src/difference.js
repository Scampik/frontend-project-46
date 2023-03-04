import _ from 'lodash';

const getKeys = (data) => Object.keys(data);

const findDiff = (file1, file2) => {
  const keys = _.union(getKeys(file1), getKeys(file2));
  const sortKeys = _.sortBy(keys);

  const difference = sortKeys.map((key) => {
    if (!Object.hasOwn(file1, key)) {
      return {
        key, value: file2[key], type: 'added',
      };
    }

    if (!Object.hasOwn(file2, key)) {
      return {
        key, value: file1[key], type: 'deleted',
      };
    }

    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      return {
        key, children: findDiff(file1[key], file2[key]), type: 'obj',
      };
    }

    if (file1[key] !== file2[key]) {
      return {
        key, value1: file1[key], value2: file2[key], type: 'changed',
      };
    }

    return {
      key, value: file1[key], type: 'unchanged',
    };
  });

  return difference;
};

export default findDiff;
