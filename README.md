```text

 ██████╗ ██╗████████╗     ██████╗ ██████╗ ███████╗███████╗███╗   ██╗
██╔════╝ ██║╚══██╔══╝    ██╔════╝ ██╔══██╗██╔════╝██╔════╝████╗  ██║
██║  ███╗██║   ██║       ██║  ███╗██████╔╝█████╗  █████╗  ██╔██╗ ██║
██║   ██║██║   ██║       ██║   ██║██╔══██╗██╔══╝  ██╔══╝  ██║╚██╗██║
╚██████╔╝██║   ██║       ╚██████╔╝██║  ██║███████╗███████╗██║ ╚████║
 ╚═════╝ ╚═╝   ╚═╝        ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═══╝

```

# Git Green

> **Beautiful web application for creating GitHub contribution graphs with Angular conventional commits**

## **TypeScript Migration Complete!**

### **Project Structure**

```
goGreen/
├── app/                    # Next.js web application
│   ├── api/                # API routes
│   │   └── generate-commits/ # Commit generation endpoint
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page
│   └── ...
├── lib/                    # Shared TypeScript utilities
│   ├── app.ts              # Legacy simple inquirer interface
│   ├── git-green.ts        # Legacy full terminal interface
│   ├── git-green-tui.ts    # Legacy TUI variant
│   ├── index.ts            # Legacy implementation
│   ├── test-commits.ts     # Example commit message viewer
│   ├── lib/                # Core utilities
│   │   └── conventional-commits.ts # Angular commit generator
│   └── types/              # Type definitions
│       └── index.ts
├── green/                  # Separate commit repository (auto-created)
├── next.config.js          # Next.js configuration (if needed)
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies and scripts
├── README.md               # This file
└── node_modules/           # Dependencies
```

## **Usage Commands**

### **Web Application (Recommended)**

```bash
pnpm dev       # Start the Next.js web app
pnpm build     # Build for production
pnpm start     # Start production server
```

### **Legacy Terminal Interfaces**

#### **Full Terminal Interface**

```bash
pnpm git-green
```

#### **Simple Terminal Interface**

```bash
pnpm start
```

#### **View Example Commits**

```bash
pnpm example-commits
```

#### **Legacy Implementation**

```bash
pnpm legacy
```

#### **Legacy Development**

```bash
pnpm legacy-build    # Compile legacy TypeScript
```

## **TypeScript Benefits**

### **Type Safety**

- Strong typing for better code reliability
- Catch errors at compile time
- Better IDE support with autocomplete
- Self-documenting code

### **Modern Development**

- ES2022 target for modern JavaScript features
- Proper module resolution
- Source maps for debugging
- Declaration files for library distribution

### **Type Definitions**

- **CommitType**: Interface for commit type definitions
- **FormData**: Interface for user input form data
- **CommitData**: Interface for commit data structure
- **ScreenType**: Type for application screen states

## **Features Working**

### **Fully Functional**

- **Beautiful Web UI**: Modern React interface with fluent animations
- **Angular Conventional Commits**: Smart commit message generation
- **Type Safety**: Full TypeScript compilation
- **Separate Directory**: Commits in `./green` folder
- **Progress Tracking**: Real-time feedback
- **Responsive Design**: Works on desktop and mobile

### **In Progress**

- **Complete Terminal Interface**: Full workflow implementation
- **Input Validation**: Type-safe form validation
- **Error Handling**: Proper error boundaries

## **Example Commit Messages**

```
feat(store): develop core module to enhance security
fix(database): correct logic error to improve reliability
refactor(hooks): improve readability
test(deployment): fix broken tests
chore(validation): update dependencies
docs(api): add comprehensive API documentation
style(ui): improve responsive design for mobile devices
```

## **Technical Stack**

- **Next.js 16**: React framework for web applications
- **React 19**: Modern React with hooks
- **TypeScript 5.9**: Modern type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library for fluent UI
- **Simple Git**: Git operations automation
- **Moment.js**: Date manipulation
- **Angular Conventional Commits**: Professional commit messages

## **Development Workflow**

1. **Write TypeScript**: Code in `.ts/.tsx` files with full type safety
2. **Run Web App**: Use `pnpm dev` for Next.js development server
3. **Build**: Use `pnpm build` to generate production build
4. **Type Checking**: Real-time error catching and IntelliSense
5. **Legacy Testing**: Use `ts-node` for legacy terminal interfaces

---

**Now with full TypeScript support and modern development experience!**
