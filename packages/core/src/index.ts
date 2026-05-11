export type Severity = 'info' | 'warn' | 'error';
export type RuleResult = { id: string; severity: Severity; title: string; detail: string };
export type Report = { status: 'ok' | 'review' | 'risk'; results: RuleResult[]; meta: Record<string, unknown> };
export type ScanInput = { root: string; artifactsDir?: string; scriptsDir?: string };
export type Rule = { id: string; run(input: ScanInput): Promise<RuleResult[]> | RuleResult[] };

export const reportStatus = (results: RuleResult[]): Report['status'] =>
  results.some(x => x.severity === 'error') ? 'risk' : results.some(x => x.severity === 'warn') ? 'review' : 'ok';

export async function analyze(input: ScanInput, rules: Rule[]): Promise<Report> {
  const results = (await Promise.all(rules.map(x => x.run(input)))).flat();
  return { status: reportStatus(results), results, meta: { root: input.root, rules: rules.map(x => x.id) } };
}
