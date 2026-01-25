import chalk from 'chalk';
import figlet from 'figlet';
import moment from 'moment';
import simpleGit from 'simple-git';
import jsonfile from 'jsonfile';
import path from 'path';
import fs from 'fs';
import { ConventionalCommitGenerator } from './lib/conventional-commits';
import { CommitData } from './types/index';

// --- Types & Interfaces ---
type CommitMode = 'random' | 'specific' | 'complete' | 'pattern';

interface FormData {
    year: string;
    commitMode: CommitMode;
    commitCount: string;
    startDate: string;
    endDate: string;
}

class GitGreenTUI {
    private formData: FormData;
    private commitGenerator: ConventionalCommitGenerator;
    private greenDir: string;
    private greenGit: any;

    constructor() {
        this.formData = {
            year: (new Date().getFullYear() - 1).toString(),
            commitMode: 'specific',
            commitCount: '100',
            startDate: '',
            endDate: ''
        };

        this.commitGenerator = new ConventionalCommitGenerator();
        this.greenDir = path.join(process.cwd(), 'green');
        this.initializeGitRepo();
    }

    private async initializeGitRepo(): Promise<void> {
        if (!fs.existsSync(this.greenDir)) {
            fs.mkdirSync(this.greenDir, { recursive: true });
        }
        if (!fs.existsSync(path.join(this.greenDir, '.git'))) {
            const { execSync } = require('child_process');
            try {
                execSync('git init', { cwd: this.greenDir, stdio: 'ignore' });
            } catch (error) {
                // Git init failed, but we can continue
            }
        }
        this.greenGit = simpleGit(this.greenDir);
    }

    private clearScreen(): void {
        console.clear();
    }

    private drawBox(title: string, content: string[]): void {
        const maxLength = Math.max(...content.map(line => line.length));
        const width = maxLength + 4;
        const height = content.length + 4;
        
        console.log(chalk.cyan('┌' + '─'.repeat(width - 2) + '┐'));
        
        // Title row
        if (title) {
            const titlePadding = Math.max(0, Math.floor((width - title.length - 4) / 2));
            const titleLine = '│' + ' '.repeat(titlePadding) + chalk.bold(title) + ' '.repeat(width - title.length - titlePadding - 4) + '│';
            console.log(chalk.cyan(titleLine));
            console.log(chalk.cyan('├' + '─'.repeat(width - 2) + '┤'));
        }
        
        // Content rows
        content.forEach(line => {
            const paddedLine = '│ ' + line.padEnd(width - 4) + ' │';
            console.log(chalk.cyan(paddedLine));
        });
        
        console.log(chalk.cyan('└' + '─'.repeat(width - 2) + '┘'));
    }

    private showWelcome(): Promise<void> {
        this.clearScreen();
        
        return new Promise((resolve) => {
            figlet.text('Git Green', { font: 'Standard' }, (err, data) => {
                if (!err && data) {
                    console.log(chalk.green(data));
                } else {
                    console.log(chalk.green('Git Green Pro'));
                }
                
                console.log(chalk.cyan('\nModern TUI for GitHub Commits\n'));
                this.drawBox('Menu', [
                    '1. Start Creating Commits',
                    '2. Exit'
                ]);
                console.log(chalk.gray('\nPress 1 to start or 2 to exit...'));
                resolve();
            });
        });
    }

    private async handleWelcome(): Promise<void> {
        if (process.stdin.setRawMode) {
            process.stdin.setRawMode(true);
        }
        
        return new Promise((resolve, reject) => {
            const onData = (buffer: Buffer) => {
                const input = buffer.toString().trim();
                
                if (input === '1') {
                    if (process.stdin.setRawMode) {
                    process.stdin.setRawMode(false);
                }
                    process.stdin.off('data', onData);
                    this.promptYear();
                    resolve();
                } else if (input === '2') {
                    if (process.stdin.setRawMode) {
                    process.stdin.setRawMode(false);
                }
                    process.stdin.off('data', onData);
                    console.log(chalk.yellow('Goodbye!'));
                    process.exit(0);
                }
            };
            
            process.stdin.on('data', onData);
            process.stdin.on('error', reject);
        });
    }

    private async promptYear(): Promise<void> {
        this.clearScreen();
        this.drawBox('Select Year', [
            `Current year: ${this.formData.year}`,
            '',
            'Enter new year (YYYY):'
        ]);
        
        return new Promise((resolve, reject) => {
            const onData = (buffer: Buffer) => {
                const input = buffer.toString().trim();
                
                if (input === '') return; // Empty input, continue waiting
                
                if (/^\d{4}$/.test(input)) {
                    const yearNum = parseInt(input);
                    const currentYear = new Date().getFullYear();
                    if (yearNum >= 1970 && yearNum <= currentYear) {
                        this.formData.year = input;
                        if (process.stdin.setRawMode) {
                    process.stdin.setRawMode(false);
                }
                        process.stdin.off('data', onData);
                        this.promptMode();
                        resolve();
                    } else {
                        console.log(chalk.red('Invalid year. Please try again.'));
                        this.promptYear().then(resolve).catch(reject);
                    }
                } else {
                    console.log(chalk.red('Invalid format. Use YYYY format.'));
                    this.promptYear().then(resolve).catch(reject);
                }
            };
            
            process.stdin.on('data', onData);
            process.stdin.on('error', reject);
        });
    }

    private async promptMode(): Promise<void> {
        this.clearScreen();
        this.drawBox('Select Mode', [
            '1. Random commits',
            '2. Specific count',
            '3. Complete year',
            '',
            'Choose option 1-3:'
        ]);
        
        return new Promise((resolve, reject) => {
            const onData = (buffer: Buffer) => {
                const input = buffer.toString().trim();
                
                if (input === '1') {
                    this.formData.commitMode = 'random';
                } else if (input === '2') {
                    this.formData.commitMode = 'specific';
                } else if (input === '3') {
                    this.formData.commitMode = 'complete';
                } else if (input === '') return;
                else {
                    console.log(chalk.red('Invalid option. Please try again.'));
                    this.promptMode().then(resolve).catch(reject);
                    return;
                }
                
                if (process.stdin.setRawMode) {
                    process.stdin.setRawMode(false);
                }
                process.stdin.off('data', onData);
                
                if (this.formData.commitMode === 'complete') {
                    this.promptDates();
                } else {
                    this.promptCount();
                }
                resolve();
            };
            
            process.stdin.on('data', onData);
            process.stdin.on('error', reject);
        });
    }

    private async promptCount(): Promise<void> {
        this.clearScreen();
        const question = this.formData.commitMode === 'random' 
            ? 'Maximum number of commits (random):'
            : 'How many commits?';
            
        this.drawBox('Commit Count', [
            `${question}`,
            `Current: ${this.formData.commitCount}`,
            '',
            'Enter number (1-1000000):'
        ]);
        
        return new Promise((resolve, reject) => {
            const onData = (buffer: Buffer) => {
                const input = buffer.toString().trim();
                
                if (input === '') return;
                
                if (/^\d+$/.test(input)) {
                    const count = parseInt(input);
                    if (count >= 1 && count <= 1000000) {
                        this.formData.commitCount = input;
                        if (process.stdin.setRawMode) {
                    process.stdin.setRawMode(false);
                }
                        process.stdin.off('data', onData);
                        this.promptDates();
                        resolve();
                    } else {
                        console.log(chalk.red('Number must be between 1 and 1000000'));
                        this.promptCount().then(resolve).catch(reject);
                    }
                } else {
                    console.log(chalk.red('Invalid number format.'));
                    this.promptCount().then(resolve).catch(reject);
                }
            };
            
            process.stdin.on('data', onData);
            process.stdin.on('error', reject);
        });
    }

    private async promptDates(): Promise<void> {
        this.clearScreen();
        
        // Set default dates
        if (!this.formData.startDate) {
            this.formData.startDate = `${this.formData.year}-01-01`;
            this.formData.endDate = `${this.formData.year}-12-31`;
        }
        
        this.drawBox('Date Range', [
            'Enter date range (YYYY-MM-DD):',
            `Start: ${this.formData.startDate}`,
            `End:   ${this.formData.endDate}`,
            '',
            'Enter "start-date end-date":'
        ]);
        
        return new Promise((resolve, reject) => {
            const onData = (buffer: Buffer) => {
                const input = buffer.toString().trim();
                
                if (input === '') return;
                
                const dates = input.split(' ');
                if (dates.length === 2) {
                    const [startDate, endDate] = dates;
                    
                    if (moment(startDate).isValid() && moment(endDate).isValid()) {
                        if (moment(endDate).isBefore(moment(startDate))) {
                            console.log(chalk.red('End date must be after start date'));
                            this.promptDates().then(resolve).catch(reject);
                        } else {
                            this.formData.startDate = startDate;
                            this.formData.endDate = endDate;
                            if (process.stdin.setRawMode) {
                    process.stdin.setRawMode(false);
                }
                            process.stdin.off('data', onData);
                            this.confirmAndExecute();
                            resolve();
                        }
                    } else {
                        console.log(chalk.red('Invalid date format. Use YYYY-MM-DD'));
                        this.promptDates().then(resolve).catch(reject);
                    }
                } else {
                    console.log(chalk.red('Please enter: "start-date end-date"'));
                    this.promptDates().then(resolve).catch(reject);
                }
            };
            
            process.stdin.on('data', onData);
            process.stdin.on('error', reject);
        });
    }

    private async confirmAndExecute(): Promise<void> {
        this.clearScreen();
        
        let summary = 'Settings Summary:\n';
        summary += `Year: ${this.formData.year}\n`;
        summary += `Mode: ${this.formData.commitMode}\n`;
        summary += `Directory: ./green\n`;
        
        if (this.formData.commitMode === 'specific') {
            summary += `Commits: ${this.formData.commitCount}\n`;
        } else if (this.formData.commitMode === 'random') {
            const max = parseInt(this.formData.commitCount);
            summary += `Random: 1-${max} commits\n`;
        } else if (this.formData.commitMode === 'complete') {
            const start = moment(this.formData.startDate);
            const end = moment(this.formData.endDate);
            const days = end.diff(start, 'days') + 1;
            summary += `Complete: ${days} daily commits\n`;
        }
        
        summary += `Range: ${this.formData.startDate} to ${this.formData.endDate}`;
        
        this.drawBox('Confirm Settings', [summary]);
        
        console.log(chalk.cyan('\nConfirm? (y/n):'));
        
        return new Promise((resolve, reject) => {
            const onData = (buffer: Buffer) => {
                const input = buffer.toString().trim().toLowerCase();
                
                if (input === 'y') {
                    if (process.stdin.setRawMode) {
                    process.stdin.setRawMode(false);
                }
                    process.stdin.off('data', onData);
                    this.executeCommits();
                    resolve();
                } else if (input === 'n') {
                    if (process.stdin.setRawMode) {
                    process.stdin.setRawMode(false);
                }
                    process.stdin.off('data', onData);
                    console.log(chalk.yellow('Operation cancelled.'));
                    process.exit(0);
                } else if (input !== '') {
                    console.log(chalk.red('Please enter y or n'));
                    this.confirmAndExecute().then(resolve).catch(reject);
                }
            };
            
            process.stdin.on('data', onData);
            process.stdin.on('error', reject);
        });
    }

    private async executeCommits(): Promise<void> {
        const { year, commitMode, commitCount, startDate, endDate } = this.formData;
        let totalCommits = 0;
        
        if (commitMode === 'specific') {
            totalCommits = parseInt(commitCount);
        } else if (commitMode === 'random') {
            totalCommits = Math.floor(Math.random() * parseInt(commitCount)) + 1;
        } else if (commitMode === 'complete') {
            const start = moment(startDate);
            const end = moment(endDate);
            totalCommits = end.diff(start, 'days') + 1;
        }

        console.clear();
        this.drawBox('Creating Commits', [`Total: ${totalCommits} commits`, 'Starting...']);
        
        try {
            const commitMessages = this.commitGenerator.generateWorkflowCommits(totalCommits);

            for (let i = 0; i < totalCommits; i++) {
                // Generate random date within range
                const start = moment(startDate);
                const end = moment(endDate);
                const totalDays = end.diff(start, 'days') + 1;
                const randomDayOffset = Math.floor(Math.random() * totalDays);
                const commitDate = moment(start).add(randomDayOffset, 'days');
                
                commitDate.year(parseInt(year));

                const formattedDate = commitDate.format('YYYY-MM-DD HH:mm:ss');
                const commitMessage = commitMessages[i % commitMessages.length] || 'chore: add generated file';
                
                const fileName = `commit-${i + 1}.json`;
                const filePath = path.join(this.greenDir, fileName);
                const data: CommitData = { 
                    date: formattedDate,
                    message: commitMessage,
                    index: i + 1
                };

                await jsonfile.writeFile(filePath, data);
                await this.greenGit.add([fileName]);
                await this.greenGit.commit(commitMessage, { '--date': formattedDate });

                // Show progress every 10 commits
                if (i % 10 === 0) {
                    console.clear();
                    this.drawBox('Creating Commits', [
                        `Progress: ${i + 1}/${totalCommits} (${Math.round(((i + 1) / totalCommits) * 100)}%)`,
                        `Current: ${commitMessage.substring(0, 40)}...`,
                        `Date: ${commitDate.format('YYYY-MM-DD')}`
                    ]);
                }
            }

            if (process.stdin.setRawMode) {
                    process.stdin.setRawMode(false);
                }
            this.showSuccess(totalCommits);

        } catch (error: any) {
            console.clear();
            this.drawBox('Error', [`Failed: ${error.message || error}`]);
            console.log(chalk.red('\nPress any key to exit...'));
            
            if (process.stdin.setRawMode) {
            process.stdin.setRawMode(true);
        }
            process.stdin.once('data', () => {
                process.exit(1);
            });
        }
    }

    private showSuccess(commitsMade: number): void {
        console.clear();
        
        figlet.text('Success!', { font: 'Standard' }, (err, data) => {
            if (!err && data) {
                console.log(chalk.green(data));
            } else {
                console.log(chalk.green('Success!'));
            }
            
            console.log(chalk.cyan(`\nSuccessfully created ${commitsMade} commits!`));
            console.log(chalk.gray('Commits created in ./green directory\n'));
            
            this.drawBox('Next Steps', [
                '1. Check the ./green directory',
                '2. Push to remote if needed',
                '3. Watch your GitHub profile turn green!'
            ]);
            
            console.log(chalk.gray('\nPress any key to exit...'));
            
            if (process.stdin.setRawMode) {
            process.stdin.setRawMode(true);
        }
            process.stdin.once('data', () => {
                process.exit(0);
            });
        });
    }

    public async run(): Promise<void> {
        try {
            await this.showWelcome();
            await this.handleWelcome();

        } catch (error: any) {
            console.error(chalk.red(`Error: ${error.message || error}`));
            process.exit(1);
        }
    }
}

// --- Start App ---
if (require.main === module) {
    const app = new GitGreenTUI();
    app.run().catch(console.error);
}