# Secret scan — Omp_Context_Manager

Report only. No history rewrite, no rotation, no visibility change, no ruleset change.
Values are not recorded. A finding would be one `file:commit:rule` row and nothing else.

- Tool: gitleaks 8.30.1
- Rules: default. No custom config, no allowlist, no rule disabled.
- Redaction flag: `--redact` (100%)

## Git history before the W1 commits

Command: `gitleaks detect --log-opts=--all --redact`

- Commits scanned: 2 (`d25b0d5`, `cce08fa`)
- Bytes scanned: about 59 KB
- Result: **CLEAN**
- Findings: 0

## W1 working tree (`--no-git`)

`.git/` and `node_modules/` were not in this file scan. Committed content is covered by the history scan above.

Paths: `src`, `tests`, `reports`, `.github`, `package.json`, `tsconfig.json`, `PATHS.md`, `MIGRATION_MANIFEST.md`, `bun.lock`, `.gitignore`.

- Result: **CLEAN**
- Findings: 0
- Per-path counts: all 0

## Rows

None.

## Rescan of the commit that added this report

Command: `gitleaks detect --log-opts=--all --redact`

- HEAD: `91c20a0` (6 commits, including the commit that added this file)
- Bytes scanned: about 83 KB
- Result: **CLEAN**
- Findings: 0

This follow-up commit only records that rescan. It does not rewrite history. A scan of this follow-up commit belongs in the PR note, not in another edit of this file, unless that scan is not CLEAN.
