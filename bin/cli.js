#!/usr/bin/env node

/*
 * Copyright 2015 Esri
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.​
 */

var bundler = require('../bundler');
var args = require('yargs')
  .usage('Usage: $0 <entry file> [options]')
  .demand(1)
  .describe('format', 'output module format (amd, cjs, es6, iife, umd)')
  .describe('sourcemap', 'Generate sourcemap (`-m inline` for inline map)')
  .describe('output', 'Output (if absent, prints to stdout)')
  .default('format', 'umd')
  .default('sourcemap', false)
  .alias('format', 'f')
  .alias('sourcemap', 'm')
  .alias('output', 'o')
  .argv;

args.entry = args._.pop();

bundler(args);
