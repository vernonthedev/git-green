# 🌱 Git Green

> **Beautiful terminal application for creating GitHub contribution graphs with Angular conventional commits**

## ✅ **TypeScript Migration Complete!**

### 📁 **Project Structure**
```
goGreen/
├── 📂 app/                    # Main TypeScript application directory
│   ├── git-green-simple.ts   # 🎨 Working TypeScript terminal interface
│   ├── git-green.ts           # 📜 Full featured terminal (in progress)
│   ├── app.ts                 # 🔧 Simple inquirer interface
│   ├── index.ts               # 📜 Legacy TypeScript implementation
│   ├── test-commits.ts         # 📝 Example commit message viewer
│   ├── lib/                   # 🔌 TypeScript utilities
│   │   ├── conventional-commits.ts # 🎯 Angular commit generator
│   │   └── types/               # 📋 Type definitions
│   │       └── index.ts
│   └── README.md              # 📖 App documentation
├── 📂 green/                  # 🌱 Separate commit repository
├── 📄 tsconfig.json          # TypeScript configuration
├── 📄 package.json           # Updated with TypeScript scripts
├── 📄 README.md              # This file
└── 📦 node_modules/          # Dependencies
```

## 🚀 **Usage Commands**

### 🎨 **Working Git Green Interface**
```bash
pnpm git-green
```

### 🔧 **Simple Terminal Interface**
```bash
pnpm start
```

### 📝 **View Example Commits**
```bash
pnpm example-commits
```

### 📜 **Legacy Implementation**
```bash
pnpm legacy
```

### 🔧 **Development**
```bash
pnpm build    # Compile TypeScript
pnpm dev       # Watch mode for development
```

## ✨ **TypeScript Benefits**

### 🎯 **Type Safety**
- Strong typing for better code reliability
- Catch errors at compile time
- Better IDE support with autocomplete
- Self-documenting code

### 🛠️ **Modern Development**
- ES2022 target for modern JavaScript features
- Proper module resolution
- Source maps for debugging
- Declaration files for library distribution

### 📋 **Type Definitions**
- **CommitType**: Interface for commit type definitions
- **FormData**: Interface for user input form data
- **CommitData**: Interface for commit data structure
- **ScreenType**: Type for application screen states

## 🎯 **Features Working**

### ✅ **Fully Functional**
- **Beautiful Terminal UI**: Green-themed interface with ASCII art
- **Angular Conventional Commits**: Smart commit message generation
- **Type Safety**: Full TypeScript compilation
- **Separate Directory**: Commits in `./green` folder
- **Progress Tracking**: Real-time progress display

### 🔄 **In Progress**
- **Complete Terminal Interface**: Full workflow implementation
- **Input Validation**: Type-safe form validation
- **Error Handling**: Proper error boundaries

## 📝 **Example Commit Messages**

```
feat(store): develop core module to enhance security
fix(database): correct logic error to improve reliability  
refactor(hooks): improve readability
test(deployment): fix broken tests
chore(validation): update dependencies
docs(api): add comprehensive API documentation
style(ui): improve responsive design for mobile devices
```

## 🛠️ **Technical Stack**

- **TypeScript 5.9**: Modern type-safe development
- **Blessed.js**: Terminal UI framework
- **ts-node**: Direct TypeScript execution
- **Simple Git**: Git operations automation
- **Moment.js**: Date manipulation
- **Angular Conventional Commits**: Professional commit messages

## 🔄 **Development Workflow**

1. **Write TypeScript**: Code in `.ts` files with full type safety
2. **Run Directly**: Use `ts-node` for immediate execution
3. **Compile**: Use `tsc` to generate JavaScript distribution
4. **Type Checking**: Real-time error catching and IntelliSense

---

**🌱 Now with full TypeScript support and modern development experience!**