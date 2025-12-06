---
agent: agent
---

# Git Commit Assistant

Please analyze my staged git changes and create a well-formatted commit message following these guidelines:

## Instructions

1. **Review staged changes**: Use the get_changed_files tool with sourceControlState=["staged"] to examine ONLY the staged files and their diffs. Do not look at unstaged changes.
   - Always provide `repositoryPath` set to the workspace repo root. This ensures consistent detection even when the active repo context is not set.
   - If no staged changes are returned, re-run with `repositoryPath` explicitly and report that there are no staged changes rather than inspecting unstaged files.
2. **Analyze the intent**: Determine the purpose and scope of the staged changes
3. **Write a commit message** following these conventions:
   - **Subject line**: Clear, concise summary (50-72 chars) in imperative mood
   - **Body** (if needed): Explain what and why, not how
   - Use present tense ("Add feature" not "Added feature")

## Commit Message Format

```
<type>: <subject>

<body>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `docs`: Documentation changes
- `style`: Formatting, missing semicolons, etc.
- `test`: Adding or updating tests
- `chore`: Maintenance tasks, dependencies, tooling

## Success Criteria

- Commit message clearly describes the changes
- Message follows conventional commit format
- After review, execute the commit with the generated message
- Handles repo context reliably by passing `repositoryPath`
