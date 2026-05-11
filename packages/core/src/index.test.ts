import { describe, expect, it } from 'vitest';
import { analyze, type Rule } from './index.js';

describe('analyze', () => {
  it('aggregates rule results', async () => {
    const rules: Rule[] = [{ id: 'sample', run: () => [{ id: 'r1', severity: 'warn', title: 't', detail: 'd' }] }];
    expect((await analyze({ root: '.' }, rules)).status).toBe('review');
  });
});
