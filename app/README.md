# 🌱 Git Green - Application Structure

This directory contains the main application code for the Git Green project.

## 📁 Directory Structure

```
app/
├── git-green.js              # Main beautiful terminal interface
├── app.js                   # Simple inquirer-based interface
├── index.js                 # Legacy/original implementation
├── test-commits.js          # Example commit message viewer
├── lib/                     # Shared utilities and classes
│   └── conventional-commits.js # Angular conventional commit generator
└── README.md               # This file
```

## 🚀 Usage

### Git Green Terminal Interface (Recommended)
```bash
pnpm git-green
```

### Simple Terminal Interface
```bash
pnpm start
```

### Legacy Original Implementation
```bash
pnpm legacy
```

### View Example Commits
```bash
pnpm example-commits
```

## 📝 Features

- **Beautiful Terminal UI**: Professional terminal interface with colors, borders, and progress bars
- **Angular Conventional Commits**: Smart commit message generation following Angular conventions
- **Separate Commit Directory**: All commits are created in the `../green` directory
- **Flexible Commit Modes**: Random, specific number, complete range, or custom patterns
- **Date Range Selection**: Choose exact start and end dates for commits
- **Progress Tracking**: Real-time progress display with percentage and counts

## 🎯 Workflow

1. **Year Selection**: Choose which year for commits
2. **Commit Mode**: Select how commits should be generated
3. **Count/Range**: Specify number of commits or date ranges
4. **Confirmation**: Review settings before execution
5. **Execution**: Watch commits being created in real-time
6. **Success**: See final results and commit count

## 📂 External Directory

- **`../green/`**: Separate git repository where commits are actually made
- This keeps the main project clean while maintaining commit history

## 🛠️ Components

### ConventionalCommitGenerator (`lib/conventional-commits.js`)
- Generates Angular-style conventional commit messages
- Supports 7 commit types: feat, fix, docs, style, refactor, test, chore
- Includes scopes, descriptions, and optional footers/bodies
- Realistic commit messages for professional appearance

### GitGreenApp (`git-green.js`)
- Main application class using blessed for terminal UI
- Screen management and navigation
- Progress tracking and visual feedback
- Integration with commit generator and git operations