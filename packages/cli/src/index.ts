import { analyze } from '@grt/core';
import { defaultRules } from '@grt/rules';

const root = process.argv[3] || process.argv[2] || process.cwd();
const cmd = process.argv[2] || 'scan';
if (cmd !== 'scan') { console.error(`Unknown command: ${cmd}`); process.exit(1); }
console.log(JSON.stringify(await analyze({ root }, defaultRules), null, 2));
