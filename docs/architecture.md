# Architecture

The toolkit is split into four packages:

- core: analyzer orchestration and report model
- rules: Glamsterdam readiness rules
- fixtures: reusable sample projects and regression data
- cli: user-facing command-line interface

Rules return structured findings with severity, title, and detail. The CLI runs rules against a project root and prints JSON reports.
