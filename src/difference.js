import _ from 'lodash';
import readFile from './parsers.js';

const getKeys = (data) => Object.keys(data);  //red

const findDiff = (file1, file2) => {    
    const keys = _.union(getKeys(file1), getKeys(file2)); //red
    const sortKeys = _.sortBy(keys);

    const difference = sortKeys.map((key) => {
      if (_.isObject(file1[key]) && _.isObject(file2[key])) {
        return {key, children: findDiff(file1[key],file2[key]), dif: 'obj'};
      } else if (!Object.hasOwn(file1, key)) {
        return { key, value: file2[key], dif: 'added'};  //add +
      } else if (!Object.hasOwn(file2, key)) {
        return { key, value: file1[key], dif: 'deleted'};  //del -
      } else if (file1[key] !== file2[key]) {
        return {key, value1: file1[key], value2: file2[key], dif: 'changed'}; //+-
      } else {
        return { key, value: file1[key], dif: 'unchanged'};
      }
    });
    //console.log(difference);
    return difference;
  };

  export default findDiff;