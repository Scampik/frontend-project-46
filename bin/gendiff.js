#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('nolik')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-u, --upper', 'output format')
  .option('-l, --lower', 'output format')
  .action((filepath1, filepath2) => {
    genDiff(filepath1, filepath2);
  });

program.parse();
