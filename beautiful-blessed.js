import blessed from 'blessed';
import figlet from 'figlet';
import chalk from 'chalk';
import ora from 'ora';
import moment from 'moment';
import simpleGit from 'simple-git';
import jsonfile from 'jsonfile';
import path from 'path';
import { ConventionalCommitGenerator } from './lib/conventional-commits.js';


class BeautifulTerminalApp {
  constructor() {
    this.screen = blessed.screen({
      smartCSR: true,
      autoPadding: true,
      title: '🌱 Git Green - Beautiful Terminal App',
      cursor: {
        artificial: true,
        shape: 'line',
        blink: true,
        element: 'underline'
      }
    });

    this.formData = {
      year: (new Date().getFullYear() - 1).toString(),
      commitMode: '',
      commitCount: '100',
      startDate: '',
      endDate: ''
    };

    this.currentStep = 0;
    this.steps = ['welcome', 'year', 'mode', 'count', 'dates', 'confirm', 'progress', 'success'];
    
    // Initialize commit generator and git for green directory
    this.commitGenerator = new ConventionalCommitGenerator();
    this.greenDir = path.join(process.cwd(), 'green');
    this.greenGit = simpleGit(this.greenDir);
    
    this.setupScreen();
    this.showWelcomeScreen();
  }

  setupScreen() {
    this.screen.key(['escape', 'C-c'], () => process.exit(0));
    this.screen.key(['q'], () => process.exit(0));
  }

  clearScreen() {
    this.screen.destroy();
    this.screen = blessed.screen({
      smartCSR: true,
      autoPadding: true,
      title: '🌱 Git Green - Beautiful Terminal App',
      cursor: {
        artificial: true,
        shape: 'line',
        blink: true,
        element: 'underline'
      }
    });
    this.setupScreen();
  }

  showWelcomeScreen() {
    this.clearScreen();

    // Create main container
    const mainBox = blessed.box({
      top: 'center',
      left: 'center',
      width: '80%',
      height: '80%',
      border: {
        type: 'line',
        fg: '#00ff00'
      },
      style: {
        fg: '#00ff00',
        bg: '#000000',
        border: {
          fg: '#00ff00'
        }
      }
    });

    // Title with figlet
    const titleBox = blessed.box({
      top: 2,
      left: 'center',
      width: '100%',
      height: 10,
      content: '',
      tags: true,
      style: {
        fg: '#00ff00',
        bold: true
      }
    });

    figlet.text('Git Green', { font: '3D' }, (err, data) => {
      if (err) {
        titleBox.setContent('{green-fg}Git Green{/green-fg}');
      } else {
        titleBox.setContent('{green-fg}' + data + '{/green-fg}');
      }
      this.screen.render();
    });

    // Subtitle
    const subtitleBox = blessed.box({
      top: 12,
      left: 'center',
      width: '100%',
      height: 3,
      content: '{center}{green-fg}🌱 Make Your GitHub Profile Green! 🌱{/green-fg}{/center}',
      tags: true,
      style: {
        fg: '#00ff00'
      }
    });

    // Description
    const descBox = blessed.box({
      top: 15,
      left: 'center',
      width: '90%',
      height: 3,
      content: '{center}{gray-fg}A beautiful terminal app for creating GitHub commits{/gray-fg}{/center}',
      tags: true,
      style: {
        fg: '#888888'
      }
    });

    // Instructions
    const instructionBox = blessed.box({
      bottom: 5,
      left: 'center',
      width: '90%',
      height: 3,
      content: '{center}{cyan-fg}Press Enter to continue • Press ESC to exit{/cyan-fg}{/center}',
      tags: true,
      style: {
        fg: '#00ffff'
      }
    });

    // Add boxes to screen
    this.screen.append(mainBox);
    mainBox.append(titleBox);
    mainBox.append(subtitleBox);
    mainBox.append(descBox);
    mainBox.append(instructionBox);

    // Handle input
    this.screen.key(['enter'], () => {
      this.showYearScreen();
    });

    this.screen.render();
  }

  showYearScreen() {
    this.clearScreen();

    const mainBox = blessed.box({
      top: 'center',
      left: 'center',
      width: '80%',
      height: '60%',
      border: {
        type: 'line',
        fg: '#00ff00'
      },
      style: {
        fg: '#00ff00',
        bg: '#000000'
      }
    });

    const titleBox = blessed.box({
      top: 2,
      left: 'center',
      width: '100%',
      height: 5,
      content: '{center}{green-fg}📅 Select Year{/green-fg}{/center}',
      tags: true,
      style: {
        fg: '#00ff00',
        bold: true
      }
    });

    const questionBox = blessed.box({
      top: 8,
      left: 'center',
      width: '90%',
      height: 3,
      content: '{center}{cyan-fg}Which year would you like to make commits in?{/cyan-fg}{/center}',
      tags: true,
      style: {
        fg: '#00ffff'
      }
    });

    const inputBox = blessed.textbox({
      top: 12,
      left: 'center',
      width: '30%',
      height: 3,
      content: this.formData.year,
      style: {
        fg: '#ffffff',
        bg: '#00ff00',
        bold: true
      },
      inputOnFocus: true
    });

    const helpBox = blessed.box({
      bottom: 5,
      left: 'center',
      width: '90%',
      height: 3,
      content: '{center}{gray-fg}Enter year and press Enter • ESC to go back{/gray-fg}{/center}',
      tags: true,
      style: {
        fg: '#888888'
      }
    });

    this.screen.append(mainBox);
    mainBox.append(titleBox);
    mainBox.append(questionBox);
    mainBox.append(inputBox);
    mainBox.append(helpBox);

    inputBox.focus();

    inputBox.key('enter', () => {
      this.formData.year = inputBox.getValue();
      this.showModeScreen();
    });

    this.screen.key('escape', () => {
      this.showWelcomeScreen();
    });

    this.screen.render();
  }

  showModeScreen() {
    this.clearScreen();

    const mainBox = blessed.box({
      top: 'center',
      left: 'center',
      width: '80%',
      height: '70%',
      border: {
        type: 'line',
        fg: '#00ff00'
      },
      style: {
        fg: '#00ff00',
        bg: '#000000'
      }
    });

    const titleBox = blessed.box({
      top: 2,
      left: 'center',
      width: '100%',
      height: 5,
      content: '{center}{green-fg}🎯 Commit Mode{/green-fg}{/center}',
      tags: true,
      style: {
        fg: '#00ff00',
        bold: true
      }
    });

    const questionBox = blessed.box({
      top: 8,
      left: 'center',
      width: '90%',
      height: 3,
      content: '{center}{cyan-fg}How would you like to make commits?{/cyan-fg}{/center}',
      tags: true,
      style: {
        fg: '#00ffff'
      }
    });

    const modes = [
      { key: '1', label: '🎲 Random number of commits', value: 'random' },
      { key: '2', label: '🔢 Specific number of commits', value: 'specific' },
      { key: '3', label: '📅 Complete range (every day)', value: 'complete' },
      { key: '4', label: '🎯 Custom pattern', value: 'pattern' }
    ];

    let yPos = 12;
    modes.forEach(mode => {
      const modeBox = blessed.box({
        top: yPos,
        left: 'center',
        width: '80%',
        height: 3,
        content: `{center}{yellow-fg}[${mode.key}]{/yellow-fg} {white-fg}${mode.label}{/white-fg}{/center}`,
        tags: true,
        style: {
          fg: '#ffffff',
          hover: {
            bg: '#00ff00',
            fg: '#000000'
          }
        }
      });

      mainBox.append(modeBox);

      this.screen.key(mode.key, () => {
        this.formData.commitMode = mode.value;
        if (mode.value === 'complete') {
          this.showDateRangeScreen();
        } else {
          this.showCommitCountScreen();
        }
      });

      yPos += 3;
    });

    const helpBox = blessed.box({
      bottom: 5,
      left: 'center',
      width: '90%',
      height: 3,
      content: '{center}{gray-fg}Press 1-4 to select • ESC to go back{/gray-fg}{/center}',
      tags: true,
      style: {
        fg: '#888888'
      }
    });

    this.screen.append(mainBox);
    mainBox.append(titleBox);
    mainBox.append(questionBox);
    mainBox.append(helpBox);

    this.screen.key('escape', () => {
      this.showYearScreen();
    });

    this.screen.render();
  }

  showCommitCountScreen() {
    this.clearScreen();

    const mainBox = blessed.box({
      top: 'center',
      left: 'center',
      width: '80%',
      height: '60%',
      border: {
        type: 'line',
        fg: '#00ff00'
      },
      style: {
        fg: '#00ff00',
        bg: '#000000'
      }
    });

    const titleBox = blessed.box({
      top: 2,
      left: 'center',
      width: '100%',
      height: 5,
      content: '{center}{green-fg}🔢 Commit Count{/green-fg}{/center}',
      tags: true,
      style: {
        fg: '#00ff00',
        bold: true
      }
    });

    const questionText = this.formData.commitMode === 'random' 
      ? 'Maximum commits (random):' 
      : 'How many commits?';

    const questionBox = blessed.box({
      top: 8,
      left: 'center',
      width: '90%',
      height: 3,
      content: `{center}{cyan-fg}${questionText}{/cyan-fg}{/center}`,
      tags: true,
      style: {
        fg: '#00ffff'
      }
    });

    const inputBox = blessed.textbox({
      top: 12,
      left: 'center',
      width: '30%',
      height: 3,
      content: this.formData.commitCount,
      style: {
        fg: '#ffffff',
        bg: '#00ff00',
        bold: true
      },
      inputOnFocus: true
    });

    const helpBox = blessed.box({
      bottom: 5,
      left: 'center',
      width: '90%',
      height: 3,
      content: '{center}{gray-fg}Enter number and press Enter • ESC to go back{/gray-fg}{/center}',
      tags: true,
      style: {
        fg: '#888888'
      }
    });

    this.screen.append(mainBox);
    mainBox.append(titleBox);
    mainBox.append(questionBox);
    mainBox.append(inputBox);
    mainBox.append(helpBox);

    inputBox.focus();

    inputBox.key('enter', () => {
      this.formData.commitCount = inputBox.getValue();
      this.showDateRangeScreen();
    });

    this.screen.key('escape', () => {
      this.showModeScreen();
    });

    this.screen.render();
  }

  showDateRangeScreen() {
    this.clearScreen();

    // Set default dates
    if (!this.formData.startDate) {
      this.formData.startDate = `${this.formData.year}-01-01`;
      this.formData.endDate = `${this.formData.year}-12-31`;
    }

    const mainBox = blessed.box({
      top: 'center',
      left: 'center',
      width: '80%',
      height: '70%',
      border: {
        type: 'line',
        fg: '#00ff00'
      },
      style: {
        fg: '#00ff00',
        bg: '#000000'
      }
    });

    const titleBox = blessed.box({
      top: 2,
      left: 'center',
      width: '100%',
      height: 5,
      content: '{center}{green-fg}🗓️ Date Range{/green-fg}{/center}',
      tags: true,
      style: {
        fg: '#00ff00',
        bold: true
      }
    });

    const startLabel = blessed.box({
      top: 8,
      left: 'center',
      width: '90%',
      height: 3,
      content: '{center}{cyan-fg}Start Date (YYYY-MM-DD):{/cyan-fg}{/center}',
      tags: true,
      style: {
        fg: '#00ffff'
      }
    });

    const startInput = blessed.textbox({
      top: 11,
      left: 'center',
      width: '30%',
      height: 3,
      content: this.formData.startDate,
      style: {
        fg: '#ffffff',
        bg: '#00ff00',
        bold: true
      },
      inputOnFocus: true
    });

    const endLabel = blessed.box({
      top: 15,
      left: 'center',
      width: '90%',
      height: 3,
      content: '{center}{cyan-fg}End Date (YYYY-MM-DD):{/cyan-fg}{/center}',
      tags: true,
      style: {
        fg: '#00ffff'
      }
    });

    const endInput = blessed.textbox({
      top: 18,
      left: 'center',
      width: '30%',
      height: 3,
      content: this.formData.endDate,
      style: {
        fg: '#ffffff',
        bg: '#00ff00',
        bold: true
      },
      inputOnFocus: true
    });

    const helpBox = blessed.box({
      bottom: 5,
      left: 'center',
      width: '90%',
      height: 3,
      content: '{center}{gray-fg}Enter dates and press Enter • ESC to go back{/gray-fg}{/center}',
      tags: true,
      style: {
        fg: '#888888'
      }
    });

    this.screen.append(mainBox);
    mainBox.append(titleBox);
    mainBox.append(startLabel);
    mainBox.append(startInput);
    mainBox.append(endLabel);
    mainBox.append(endInput);
    mainBox.append(helpBox);

    startInput.focus();

    startInput.key('enter', () => {
      this.formData.startDate = startInput.getValue();
      endInput.focus();
    });

    endInput.key('enter', () => {
      this.formData.endDate = endInput.getValue();
      this.showConfirmScreen();
    });

    this.screen.key('escape', () => {
      this.showCommitCountScreen();
    });

    this.screen.render();
  }

  showConfirmScreen() {
    this.clearScreen();

    const mainBox = blessed.box({
      top: 'center',
      left: 'center',
      width: '80%',
      height: '70%',
      border: {
        type: 'line',
        fg: '#00ff00'
      },
      style: {
        fg: '#00ff00',
        bg: '#000000'
      }
    });

    const titleBox = blessed.box({
      top: 2,
      left: 'center',
      width: '100%',
      height: 5,
      content: '{center}{green-fg}✅ Confirm Settings{/green-fg}{/center}',
      tags: true,
      style: {
        fg: '#00ff00',
        bold: true
      }
    });

    // Generate summary
    let summary = `📅 Year: ${this.formData.year}\n`;
    summary += `📊 Mode: ${this.formData.commitMode}\n`;
    summary += `📁 Directory: ./green\n`;
    
    if (this.formData.commitMode === 'specific') {
      summary += `🔢 Commits: ${this.formData.commitCount}\n`;
    } else if (this.formData.commitMode === 'random') {
      const max = parseInt(this.formData.commitCount);
      summary += `🎲 Random commits: 1-${max}\n`;
    }
    
    summary += `🗓️ Range: ${this.formData.startDate} to ${this.formData.endDate}\n`;
    summary += `📝 Messages: Angular conventional commits`;

    const summaryBox = blessed.box({
      top: 8,
      left: 'center',
      width: '90%',
      height: 8,
      content: `{center}{white-fg}${summary}{/white-fg}{/center}`,
      tags: true,
      border: {
        type: 'line',
        fg: '#00ff00'
      },
      style: {
        fg: '#ffffff',
        border: {
          fg: '#00ff00'
        }
      }
    });

    const questionBox = blessed.box({
      top: 18,
      left: 'center',
      width: '90%',
      height: 3,
      content: '{center}{yellow-fg}Proceed with these commits?{/yellow-fg}{/center}',
      tags: true,
      style: {
        fg: '#ffff00'
      }
    });

    const optionsBox = blessed.box({
      bottom: 8,
      left: 'center',
      width: '90%',
      height: 5,
      content: '{center}{green-fg}[Y] Yes{/green-fg}           {red-fg}[N] No{/red-fg}{/center}',
      tags: true,
      style: {
        fg: '#ffffff'
      }
    });

    const helpBox = blessed.box({
      bottom: 3,
      left: 'center',
      width: '90%',
      height: 3,
      content: '{center}{gray-fg}Press Y to confirm or N to cancel{/gray-fg}{/center}',
      tags: true,
      style: {
        fg: '#888888'
      }
    });

    this.screen.append(mainBox);
    mainBox.append(titleBox);
    mainBox.append(summaryBox);
    mainBox.append(questionBox);
    mainBox.append(optionsBox);
    mainBox.append(helpBox);

    this.screen.key('y', () => {
      this.showProgressScreen();
      this.executeCommits();
    });

    this.screen.key('n', () => {
      this.showWelcomeScreen();
    });

    this.screen.key('escape', () => {
      this.showDateRangeScreen();
    });

    this.screen.render();
  }

  showProgressScreen() {
    this.clearScreen();

    const mainBox = blessed.box({
      top: 'center',
      left: 'center',
      width: '80%',
      height: '60%',
      border: {
        type: 'line',
        fg: '#00ff00'
      },
      style: {
        fg: '#00ff00',
        bg: '#000000'
      }
    });

    const titleBox = blessed.box({
      top: 5,
      left: 'center',
      width: '100%',
      height: 5,
      content: '{center}{green-fg}⚡ Creating Commits...{/green-fg}{/center}',
      tags: true,
      style: {
        fg: '#00ff00',
        bold: true
      }
    });

    const progressBox = blessed.box({
      top: 12,
      left: 'center',
      width: '90%',
      height: 3,
      content: '{center}{cyan-fg}Please wait while we create your commits...{/cyan-fg}{/center}',
      tags: true,
      style: {
        fg: '#00ffff'
      }
    });

    const progressBar = blessed.progressbar({
      top: 18,
      left: 'center',
      width: '70%',
      height: 3,
      filled: 0,
      style: {
        fg: '#00ff00',
        bg: '#333333',
        bar: {
          fg: '#00ff00'
        }
      }
    });

    this.screen.append(mainBox);
    mainBox.append(titleBox);
    mainBox.append(progressBox);
    mainBox.append(progressBar);

    // Store reference for updates
    this.progressBar = progressBar;
    this.progressBox = progressBox;

    this.screen.render();
  }

  async executeCommits() {
    const greenPath = path.join(this.greenDir, 'commit-data.json');
    let totalCommits = 0;
    
    if (this.formData.commitMode === 'specific') {
      totalCommits = parseInt(this.formData.commitCount);
    } else if (this.formData.commitMode === 'random') {
      totalCommits = Math.floor(Math.random() * parseInt(this.formData.commitCount)) + 1;
    } else if (this.formData.commitMode === 'complete') {
      const start = moment(this.formData.startDate);
      const end = moment(this.formData.endDate);
      totalCommits = end.diff(start, 'days') + 1;
    }

    // Generate all commit messages upfront
    const commitMessages = this.commitGenerator.generateWorkflowCommits(totalCommits);

    for (let i = 0; i < totalCommits; i++) {
      try {
        // Generate random date within range
        const start = moment(this.formData.startDate);
        const end = moment(this.formData.endDate);
        const totalDays = end.diff(start, 'days') + 1;
        const randomDayOffset = Math.floor(Math.random() * totalDays);
        const commitDate = moment(start).add(randomDayOffset, 'days');
        
        // Set the year explicitly
        commitDate.year(parseInt(this.formData.year));

        const formattedDate = commitDate.format('YYYY-MM-DD HH:mm:ss');
        const commitMessage = commitMessages[i % commitMessages.length];
        const data = { 
          date: formattedDate,
          message: commitMessage,
          index: i + 1
        };

        // Write to green directory
        await jsonfile.writeFile(greenPath, data);
        await this.greenGit.add(['commit-data.json']);
        await this.greenGit.commit(commitMessage, { '--date': formattedDate });

        // Update progress
        const progress = Math.round(((i + 1) / totalCommits) * 100);
        this.progressBar.setProgress(progress);
        this.progressBox.setContent(`{center}{cyan-fg}Creating commits... ${i + 1}/${totalCommits} (${progress}%){/cyan-fg}{/center}`);
        this.screen.render();

        // Show current commit message
        if (i < 5) { // Show first few commits for visual feedback
          this.progressBox.setContent(`{center}{cyan-fg}Creating commits... ${i + 1}/${totalCommits} (${progress}%){/cyan-fg}\n{center}{gray-fg}${commitMessage.substring(0, 50)}...{/gray-fg}{/center}`);
        }

        // Small delay to show progress
        await new Promise(resolve => setTimeout(resolve, 100));

      } catch (error) {
        console.error('Error creating commit:', error);
      }
    }

    // Push to remote (if configured)
    try {
      // Check if remote exists
      const remotes = await this.greenGit.getRemotes();
      if (remotes.length > 0) {
        await this.greenGit.push();
      }
    } catch (error) {
      // It's okay if there's no remote configured yet
      console.log('No remote configured or push failed:', error.message);
    }

    this.showSuccessScreen(totalCommits);
  }

  showSuccessScreen(commitsMade) {
    this.clearScreen();

    const mainBox = blessed.box({
      top: 'center',
      left: 'center',
      width: '80%',
      height: '60%',
      border: {
        type: 'line',
        fg: '#00ff00'
      },
      style: {
        fg: '#00ff00',
        bg: '#000000'
      }
    });

    const titleBox = blessed.box({
      top: 5,
      left: 'center',
      width: '100%',
      height: 5,
      content: '{center}{green-fg}🎉 Success!{/green-fg}{/center}',
      tags: true,
      style: {
        fg: '#00ff00',
        bold: true
      }
    });

    const messageBox = blessed.box({
      top: 12,
      left: 'center',
      width: '90%',
      height: 5,
      content: `{center}{white-fg}Successfully created ${commitsMade} commits!{/white-fg}{/center}`,
      tags: true,
      style: {
        fg: '#ffffff'
      }
    });

    const pushBox = blessed.box({
      top: 18,
      left: 'center',
      width: '90%',
      height: 3,
      content: '{center}{cyan-fg}Commits created in ./green directory{/cyan-fg}{/center}',
      tags: true,
      style: {
        fg: '#00ffff'
      }
    });

    const exitBox = blessed.box({
      bottom: 5,
      left: 'center',
      width: '90%',
      height: 3,
      content: '{center}{gray-fg}Press any key to exit{/gray-fg}{/center}',
      tags: true,
      style: {
        fg: '#888888'
      }
    });

    this.screen.append(mainBox);
    mainBox.append(titleBox);
    mainBox.append(messageBox);
    mainBox.append(pushBox);
    mainBox.append(exitBox);

    // Exit on any key
    this.screen.key(['enter', 'escape', 'q'], () => {
      process.exit(0);
    });

    this.screen.render();
  }
}

// Start the app
const app = new BeautifulTerminalApp();