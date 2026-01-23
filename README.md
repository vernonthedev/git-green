```text

 ██████╗ ██╗████████╗     ██████╗ ██████╗ ███████╗███████╗███╗   ██╗
██╔════╝ ██║╚══██╔══╝    ██╔════╝ ██╔══██╗██╔════╝██╔════╝████╗  ██║
██║  ███╗██║   ██║       ██║  ███╗██████╔╝█████╗  █████╗  ██╔██╗ ██║
██║   ██║██║   ██║       ██║   ██║██╔══██╗██╔══╝  ██╔══╝  ██║╚██╗██║
╚██████╔╝██║   ██║       ╚██████╔╝██║  ██║███████╗███████╗██║ ╚████║
 ╚═════╝ ╚═╝   ╚═╝        ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═══╝

```

# 🌱 Git Green

> **Beautiful terminal application for creating GitHub contribution graphs with Angular conventional commits**

## 📁 Project Structure

```
goGreen/
├── 📂 app/                    # Main application directory
│   ├── git-green.js            # 🎨 Beautiful terminal UI (recommended)
│   ├── app.js                 # 🔧 Simple inquirer interface
│   ├── index.js               # 📜 Legacy original implementation
│   ├── test-commits.js         # 📝 Example commit message viewer
│   ├── lib/                   # 🔌 Shared utilities
│   │   └── conventional-commits.js # 🎯 Angular commit generator
│   └── README.md              # 📖 App documentation
├── 📂 green/                  # 🌱 Separate commit repository
│   ├── .git/                  # Git repository for commits
│   ├── commit-data.json        # Generated commit files
│   └── package.json           # Package configuration
├── 📄 package.json           # Main package configuration
├── 📄 README.md              # This file
└── 📦 node_modules/          # Dependencies
```

## 🚀 Quick Start

### 🎨 Git Green Terminal Interface (Recommended)
```bash
pnpm git-green
```

### 🔧 Simple Terminal Interface
```bash
pnpm start
```

### 📝 View Example Commits
```bash
pnpm example-commits
```

### 📜 Legacy Implementation
```bash
pnpm legacy
```

## ✨ Features

### 🎨 **Beautiful Terminal UI**
- Professional green-themed interface
- ASCII art title and smooth navigation
- Real-time progress tracking with percentage
- Color-coded screens and proper layouts
- Keyboard shortcuts and intuitive navigation

### 📝 **Angular Conventional Commits**
- Smart commit message generation
- 7 commit types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- 25+ scopes for realistic commit messages
- Optional bodies and footers
- Professional commit structure

### 📂 **Separate Commit Directory**
- All commits created in `./green` directory
- Keeps main project clean
- Independent git repository
- No mixing of project files with commit history

### 🎯 **Flexible Commit Options**
- **Random**: Generate 1-N random commits
- **Specific**: Exact number of commits
- **Complete**: Every day in date range
- **Pattern**: Custom commit patterns (future feature)

### 📅 **Date Range Selection**
- Choose any year for commits
- Custom start and end dates
- Randomized commit dates within range
- Proper time zone handling

## 🎯 Example Commit Messages

```
feat(store): develop core module to enhance security
fix(database): correct logic error to improve reliability  
refactor(hooks): improve readability
test(deployment): fix broken tests
chore(validation): update dependencies
docs(api): add comprehensive API documentation
style(ui): improve responsive design for mobile devices
```

## 🛠️ Technical Stack

- **Terminal UI**: Blessed.js for beautiful terminal interfaces
- **Git Operations**: simple-git for git automation
- **Date Handling**: Moment.js for date manipulation
- **Commit Generation**: Custom Angular conventional commit generator
- **Package Management**: pnpm for efficient dependency management

## 🔄 Workflow

1. **Year Selection**: Choose target year for commits
2. **Mode Selection**: Pick commit generation strategy
3. **Configuration**: Set dates and commit counts
4. **Confirmation**: Review settings before execution
5. **Execution**: Watch real-time progress
6. **Success**: View results and commit summary

## 📁 External Dependencies

The project uses a **separate `green` directory** for all git operations:
- Keeps the main codebase clean
- Isolates commit history from project files
- Easy to manage and clean up
- Prevents accidental commit of project files

## 🎨 Why the App Directory Structure?

Using an `app/` directory provides:
- **Better Organization**: Clear separation of application code
- **Scalability**: Easy to add new features and modules
- **Maintainability**: Logical structure for future development
- **Professional**: Follows modern Node.js project conventions

---

**🌱 Make your GitHub profile green with style and professionalism!**
