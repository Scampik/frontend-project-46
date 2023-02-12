#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('why u need this')
  .option('-f, --format <type>', 'output format (stylish)', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    genDiff(filepath1, filepath2, program.opts().format);
  });

program.parse();
