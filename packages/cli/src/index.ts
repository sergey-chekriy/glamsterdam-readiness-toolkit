#!/usr/bin/env node
import { analyze } from '@grt/core';
import { defaultRules } from '@grt/rules';
import { argv, cwd } from 'node:process';

const root = argv[2] || cwd();
console.log(JSON.stringify(analyze({ root }, defaultRules), null, 2));