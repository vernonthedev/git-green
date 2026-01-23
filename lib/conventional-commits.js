export class ConventionalCommitGenerator {
  constructor() {
    this.types = {
      feat: [
        'add new feature',
        'implement user authentication',
        'create new component',
        'add api endpoint',
        'introduce new functionality',
        'enable new feature',
        'build user interface',
        'develop core module',
        'add support for',
        'introduce capability'
      ],
      fix: [
        'resolve bug in',
        'fix issue with',
        'correct behavior in',
        'patch vulnerability in',
        'resolve error handling',
        'fix typo in',
        'correct logic error',
        'resolve regression',
        'patch security issue',
        'fix performance issue'
      ],
      docs: [
        'update documentation',
        'add readme',
        'improve API docs',
        'update changelog',
        'add usage examples',
        'document configuration',
        'update contribution guide',
        'add deployment guide',
        'document breaking changes',
        'update technical docs'
      ],
      style: [
        'improve code formatting',
        'update styling',
        'refactor css',
        'improve layout',
        'update color scheme',
        'improve typography',
        'optimize stylesheets',
        'update responsive design',
        'improve visual hierarchy',
        'refactor component styles'
      ],
      refactor: [
        'refactor codebase',
        'improve code structure',
        'optimize performance',
        'simplify implementation',
        'improve readability',
        'reduce complexity',
        'optimize algorithms',
        'improve architecture',
        'reorganize modules',
        'streamline process'
      ],
      test: [
        'add unit tests',
        'improve test coverage',
        'add integration tests',
        'fix broken tests',
        'update test suite',
        'add e2e tests',
        'improve testing',
        'add test utilities',
        'update test fixtures',
        'improve assertions'
      ],
      chore: [
        'update dependencies',
        'improve build process',
        'update configuration',
        'add git hooks',
        'improve ci/cd',
        'update scripts',
        'optimize bundling',
        'improve deployment',
        'update tooling',
        'add automation'
      ]
    };

    this.scopes = [
      'core', 'api', 'ui', 'auth', 'config', 'utils', 'components', 
      'services', 'database', 'security', 'performance', 'deployment',
      'testing', 'documentation', 'build', 'cli', 'middleware', 'routes',
      'models', 'hooks', 'store', 'validation', 'logging', 'cache'
    ];

    this.footers = [
      'BREAKING CHANGE: This update introduces breaking changes.',
      'Reviewed-by: bot',
      'Signed-off-by: developer',
      'Closes #123',
      'Fixes #456',
      'Resolves #789',
      'Related to #101',
      'Performance improvements',
      'Security updates',
      'Deprecated functionality'
    ];
  }

  generateRandomCommit() {
    const type = this.getRandomType();
    const scope = this.getRandomScope();
    const description = this.getRandomDescription(type);
    const hasFooter = Math.random() > 0.7; // 30% chance of having a footer
    const footer = hasFooter ? this.getRandomFooter() : '';

    // Build commit message
    let commitMessage = `${type}`;
    
    if (scope && Math.random() > 0.3) { // 70% chance of including scope
      commitMessage += `(${scope})`;
    }
    
    commitMessage += `: ${description}`;

    if (footer) {
      commitMessage += `\n\n${footer}`;
    }

    // Sometimes add a more detailed body
    if (Math.random() > 0.8) { // 20% chance of having detailed body
      const body = this.generateBody();
      commitMessage = `${commitMessage}\n\n${body}`;
    }

    return commitMessage;
  }

  getRandomType() {
    const types = Object.keys(this.types);
    return types[Math.floor(Math.random() * types.length)];
  }

  getRandomScope() {
    return this.scopes[Math.floor(Math.random() * this.scopes.length)];
  }

  getRandomDescription(type) {
    const descriptions = this.types[type];
    const baseDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
    
    // Add variety with context
    const contexts = [
      'for better user experience',
      'to improve performance',
      'for better maintainability',
      'to enhance security',
      'for better scalability',
      'to improve reliability',
      'for better testing',
      'to improve documentation',
      'for better accessibility',
      'to improve code quality'
    ];

    if (Math.random() > 0.5) {
      const context = contexts[Math.floor(Math.random() * contexts.length)];
      return `${baseDescription} ${context}`;
    }

    return baseDescription;
  }

  getRandomFooter() {
    return this.footers[Math.floor(Math.random() * this.footers.length)];
  }

  generateBody() {
    const bodyTemplates = [
      'This change addresses several issues reported by users and improves the overall stability of the application.',
      'The implementation has been optimized for better performance and reduced memory usage.',
      'Added comprehensive error handling and logging for better debugging capabilities.',
      'Updated the implementation to follow best practices and improve code maintainability.',
      'This change introduces new functionality while maintaining backward compatibility.',
      'Improved the user interface with better accessibility and responsive design.',
      'Enhanced security measures and implemented proper validation throughout the codebase.',
      'Refactored legacy code to use modern patterns and improve developer experience.',
      'Added comprehensive tests to ensure reliability and prevent regressions.',
      'Optimized the build process for faster compilation and better development workflow.'
    ];

    return bodyTemplates[Math.floor(Math.random() * bodyTemplates.length)];
  }

  // Generate commit messages for specific scenarios
  generateFeatureCommit() {
    const type = 'feat';
    const scope = this.getRandomScope();
    const description = this.getRandomDescription(type);
    return `${type}(${scope}): ${description}`;
  }

  generateBugFixCommit() {
    const type = 'fix';
    const scope = this.getRandomScope();
    const description = this.getRandomDescription(type);
    return `${type}(${scope}): ${description}`;
  }

  generateRefactorCommit() {
    const type = 'refactor';
    const scope = this.getRandomScope();
    const description = this.getRandomDescription(type);
    return `${type}(${scope}): ${description}`;
  }

  generateTestCommit() {
    const type = 'test';
    const scope = this.getRandomScope();
    const description = this.getRandomDescription(type);
    return `${type}(${scope}): ${description}`;
  }

  generateChoreCommit() {
    const type = 'chore';
    const scope = this.getRandomScope();
    const description = this.getRandomDescription(type);
    return `${type}(${scope}): ${description}`;
  }

  // Generate commits based on workflow patterns
  generateWorkflowCommits(count = 10) {
    const commits = [];
    const commitGenerators = [
      () => this.generateFeatureCommit(),
      () => this.generateBugFixCommit(),
      () => this.generateRefactorCommit(),
      () => this.generateTestCommit(),
      () => this.generateChoreCommit(),
      () => this.generateRandomCommit()
    ];

    for (let i = 0; i < count; i++) {
      const generator = commitGenerators[Math.floor(Math.random() * commitGenerators.length)];
      commits.push(generator());
    }

    return commits;
  }
}