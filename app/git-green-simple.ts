import blessed from 'blessed';
import figlet from 'figlet';
import moment from 'moment';
import simpleGit from 'simple-git';
import jsonfile from 'jsonfile';
import path from 'path';
import { ConventionalCommitGenerator } from './lib/conventional-commits';
import { FormData, ScreenType, CommitData } from './types/index';
import fs from 'fs';

export class GitGreenApp {
  private screen: any;
  private formData: FormData;
  private currentStep: number;
  private steps: ScreenType[];
  private commitGenerator: ConventionalCommitGenerator;
  private greenDir: string;
  private greenGit: any;
  private progressBar?: any;
  private progressBox?: any;

  constructor() {
    this.screen = blessed.screen({
      smartCSR: true,
      autoPadding: true,
      title: '🌱 Git Green - Beautiful Terminal App'
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
    if (!fs.existsSync(this.greenDir)) {
      fs.mkdirSync(this.greenDir);
    }
    this.greenGit = simpleGit(this.greenDir);
    
    this.setupScreen();
    this.showWelcomeScreen();
  }

  private setupScreen(): void {
    this.screen.key(['escape', 'C-c'], () => process.exit(0));
    this.screen.key(['q'], () => process.exit(0));
  }

  private clearScreen(): void {
    if (this.screen) {
      this.screen.destroy();
    }
    this.screen = blessed.screen({
      smartCSR: true,
      autoPadding: true,
      title: '🌱 Git Green - Beautiful Terminal App'
    });
    this.setupScreen();
  }

  private showWelcomeScreen(): void {
    this.clearScreen();

    // Create main container
    const mainBox = blessed.box({
      top: 'center',
      left: 'center',
      width: '80%',
      border: {
        type: 'line',
        fg: '#00ff00'
      } as any,
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

  private showYearScreen(): void {
    this.clearScreen();

    const mainBox = blessed.box({
      top: 'center',
      left: 'center',
      width: '80%',
      height: '60%',
      border: {
        type: 'line',
        fg: '#00ff00'
      } as any,
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
      content: this.formData.year || '',
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
      const value = inputBox.getValue();
      if (value) {
        this.formData.year = value;
      }
      this.showModeScreen();
    });

    this.screen.key('escape', () => {
      this.showWelcomeScreen();
    });

    this.screen.render();
  }

  private async executeCommits(): Promise<void> {
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
        const commitMessage = commitMessages[i % commitMessages.length] || 'chore: add generated file';
        const data: CommitData = { 
          date: formattedDate,
          message: commitMessage,
          index: i + 1
        };

        // Write to green directory
        await jsonfile.writeFile(greenPath, data);
        await this.greenGit.add(['commit-data.json']);
        await this.greenGit.commit(commitMessage, { '--date': formattedDate });

        // Update progress
        if (this.progressBar && this.progressBox) {
          const progress = Math.round(((i + 1) / totalCommits) * 100);
          if (this.progressBar) {
          (this.progressBar as any).setProgress(progress);
        }
          this.progressBox.setContent(`{center}{cyan-fg}Creating commits... ${i + 1}/${totalCommits} (${progress}%){/cyan-fg}{/center}`);
          this.screen.render();

          // Show current commit message
          if (i < 5) { // Show first few commits for visual feedback
            this.progressBox.setContent(`{center}{cyan-fg}Creating commits... ${i + 1}/${totalCommits} (${progress}%){/cyan-fg}\n{center}{gray-fg}${commitMessage.substring(0, 50)}...{/gray-fg}{/center}`);
          }
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
      console.log('No remote configured or push failed:', error);
    }

    this.showSuccessScreen(totalCommits);
  }

  private showSuccessScreen(commitsMade: number): void {
    this.clearScreen();

    const mainBox = blessed.box({
      top: 'center',
      left: 'center',
      width: '80%',
      height: '60%',
      border: {
        type: 'line',
        fg: '#00ff00'
      } as any,
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

  // Placeholder methods for UI flow
  private showModeScreen(): void {
    // Implementation would go here for full functionality
    console.log('Mode screen - simplified for TypeScript migration');
    this.showYearScreen();
  }

  private showCommitCountScreen(): void {
    console.log('Commit count screen - simplified for TypeScript migration');
    this.showYearScreen();
  }

  private showDateRangeScreen(): void {
    console.log('Date range screen - simplified for TypeScript migration');
    this.executeCommits();
  }

  private showConfirmScreen(): void {
    console.log('Confirm screen - simplified for TypeScript migration');
    this.executeCommits();
  }

  private showProgressScreen(): void {
    console.log('Progress screen - simplified for TypeScript migration');
    // Progress will be shown during executeCommits
  }
}

// Start app
const app = new GitGreenApp();