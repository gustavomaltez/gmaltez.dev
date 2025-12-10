---
allowed-tools: Bash, Read, Grep
description: Generate conventional commit message from staged changes
---

Generate a conventional commit message from staged changes and commit as the user.

## Process

### 1. Check Staged Changes

```bash
git diff --cached --name-only
```

If no staged changes, output warning and exit:
```
No staged changes. Stage files with `git add <files>` first.
```

**Never run git add automatically.**

### 2. Analyze Changes

```bash
git diff --cached --stat
git diff --cached
```

### 3. Determine Commit Type

| Pattern | Type |
|---------|------|
| `*.spec.ts`, `*.e2e-spec.ts` | `test` |
| `*.md`, `docs/**` | `docs` |
| `.github/**`, `*.config.*`, `package.json` | `chore` |
| New files in `src/` | `feat` |
| Fix/bug/error keywords in diff | `fix` |
| Refactor/rename/extract keywords | `refactor` |
| Performance/optimize keywords | `perf` |

Priority: feat > fix > refactor > perf > test > docs > chore

### 4. Generate Message

Format:
```
<type>: <short description>

- Key change 1
- Key change 2
```

Rules:
- Title under 72 chars, lowercase after colon, no period
- Present tense, imperative mood (add, fix, update)
- Body lists key changes with bullet points
- Mention specific components/features

### 5. Commit

Use heredoc for multi-line messages:

```bash
git commit -m "$(cat <<'EOF'
<type>: <description>

- Change 1
- Change 2
EOF
)"
```

**Do NOT add Claude attribution or co-authorship.**

### 6. Output

```
Committed: <type>: <description>
Files: <count> (+<added>, -<removed>)
```
