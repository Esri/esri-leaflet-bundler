#!/usr/bin/env node
var bundler = require('../bundler');
var args = require('yargs')
  .usage('Usage: $0 <entry file> [options]')
  .demand(1)
  .describe('format', 'output module format (amd, cjs, es6, iife, umd)')
  .describe('sourcemap', 'Generate sourcemap (`-m inline` for inline map)')
  .describe('output', 'Output (if absent, prints to stdout)')
  .alias('format', 'f')
  .alias('sourcemap', 'm')
  .alias('output', 'o')
  .argv;

args.entry = args._.pop();

bundler(args);
