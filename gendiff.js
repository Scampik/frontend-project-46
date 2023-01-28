#!/usr/bin/env node

import { readFileSync } from 'fs';
import { program } from 'commander';
import path from 'path';
import _ from 'lodash';

const getPath = (filepath) => path.resolve(process.cwd(), filepath);

const readFile = (filepath) => {
    const file = readFileSync(getPath(filepath));
    return JSON.parse(file);
};

const getKeys = (data) => Object.keys(data);

const command = (filepath1, filepath2) => {
    const file1 = readFile(filepath1);
    const file2 = readFile(filepath2);
    const keys = _.union(getKeys(file1), getKeys(file2));
    const sortKeys = _.sortBy(keys);
    const result = {};
    const added = '+ ';
    const deleted = '- ';   
    const unchanged = '  ';

    for (const key of sortKeys) {
        if (!Object.hasOwn(file1,key)) {
            result[added+key] = file2[key];
        } else if (!Object.hasOwn(file2,key)) {
            result[deleted+key] = file1[key];
        } else if (file1[key] !== file2[key]) {
            result[deleted+key]= file1[key];
            result[added+key]= file2[key];
        } else {
            result[unchanged+key] = file1[key]
        }
    }
    console.log(result); 
  };

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('nolik')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-u, --upper', 'output format')
  .option('-l, --lower', 'output format')
  .action(command)
  .parse(process.argv);

  /*
  const { args } = program;
  const options = program.opts();
  const { lower, upper } = options;
  
  command(args, lower, upper); */