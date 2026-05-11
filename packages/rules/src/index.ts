import type { Rule, ScanInput } from '@grt/core';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const walk = (dir: string, out: string[] = []): string[] =>
  !statSync(dir).isDirectory() ? out : readdirSync(dir).reduce((acc, name) => {
    const p = join(dir, name); return statSync(p).isDirectory() ? walk(p, acc) : (acc.push(p), acc);
  }, out);

const find = (root: string, rx: RegExp) => walk(root).filter(x => rx.test(x));

export const nearCodeSizeRule: Rule = {
  id: 'near-code-size',
  run: ({ root }: ScanInput) => find(root, /\.(sol|json)$/).slice(0, 1).map(x => ({
    id: 'near-code-size', severity: 'info', title: 'Code-size check placeholder', detail: `Scanned ${x}`
  }))
};

export const ethTransferLogAssumptionRule: Rule = {
  id: 'eth-transfer-log-assumption',
  run: ({ root }: ScanInput) => find(root, /\.sol$/).flatMap(x => {
    const s = readFileSync(x, 'utf8');
    return /transfer\(|send\(|call\{value:/.test(s)
      ? [{ id: 'eth-transfer-log-assumption', severity: 'warn', title: 'Review ETH transfer assumptions', detail: `Potential ETH transfer flow in ${x}` }]
      : [];
  })
};

export const defaultRules = [nearCodeSizeRule, ethTransferLogAssumptionRule];