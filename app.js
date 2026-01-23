import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import moment from 'moment';
import simpleGit from 'simple-git';
import jsonfile from 'jsonfile';

const git = simpleGit();
const path = "./data.json";

class CommitManager {
  constructor() {
    this.commitsMade = 0;
    this.totalCommits = 0;
  }

  async promptUser() {
    console.log(chalk.cyan.bold('\n🌱 Git Commit Manager - Make Your GitHub Profile Green! 🌱\n'));

    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'year',
        message: 'Which year would you like to make commits in?',
        default: () => (new Date().getFullYear() - 1).toString(),
        validate: (input) => {
          const year = parseInt(input);
          const currentYear = new Date().getFullYear();
          if (year < 1970 || year > currentYear) {
            return `Please enter a valid year between 1970 and ${currentYear}`;
          }
          return true;
        }
      },
      {
        type: 'list',
        name: 'commitMode',
        message: 'How would you like to make commits?',
        choices: [
          { name: '🎲 Random number of commits', value: 'random' },
          { name: '🔢 Specific number of commits', value: 'specific' },
          { name: '📅 Complete range (every day)', value: 'complete' },
          { name: '🎯 Custom pattern', value: 'pattern' }
        ]
      },
      {
        type: 'input',
        name: 'commitCount',
        message: 'How many commits would you like to make?',
        default: '100',
        validate: (input) => {
          if (answers.commitMode === 'specific') {
            const count = parseInt(input);
            if (count < 1 || count > 1000) {
              return 'Please enter a number between 1 and 1000';
            }
            return true;
          }
          return true;
        },
        when: (answers) => answers.commitMode === 'specific' || answers.commitMode === 'random'
      },
      {
        type: 'input',
        name: 'startDate',
        message: 'Start date (YYYY-MM-DD)',
        default: () => `${answers.year}-01-01`,
        validate: (input) => {
          const date = moment(input);
          if (!date.isValid()) {
            return 'Please enter a valid date in YYYY-MM-DD format';
          }
          if (date.year() !== parseInt(answers.year)) {
            return `Date must be in the year ${answers.year}`;
          }
          return true;
        }
      },
      {
        type: 'input',
        name: 'endDate',
        message: 'End date (YYYY-MM-DD)',
        default: () => `${answers.year}-12-31`,
        validate: (input) => {
          const date = moment(input);
          if (!date.isValid()) {
            return 'Please enter a valid date in YYYY-MM-DD format';
          }
          if (date.year() !== parseInt(answers.year)) {
            return `Date must be in the year ${answers.year}`;
          }
          if (date.isBefore(moment(answers.startDate))) {
            return 'End date must be after start date';
          }
          return true;
        }
      },
      {
        type: 'confirm',
        name: 'confirm',
        message: (answers) => {
          const summary = this.generateSummary(answers);
          return chalk.yellow(`Confirm settings:\n${summary}\nProceed with these commits?`);
        },
        default: true
      }
    ]);

    if (answers.confirm) {
      await this.executeCommits(answers);
    } else {
      console.log(chalk.red('Operation cancelled.'));
    }
  }

  generateSummary(answers) {
    const { year, commitMode, commitCount, startDate, endDate } = answers;
    let summary = `📅 Year: ${year}\n`;
    summary += `📊 Mode: ${commitMode}\n`;
    
    if (commitMode === 'specific') {
      summary += `🔢 Commits: ${commitCount}\n`;
    } else if (commitMode === 'random') {
      const max = parseInt(commitCount);
      summary += `🎲 Random commits: 1-${max}\n`;
    }
    
    summary += `🗓️  Range: ${startDate} to ${endDate}`;
    return summary;
  }

  async executeCommits(answers) {
    const { commitMode, commitCount, startDate, endDate } = answers;
    
    let totalCommits = 0;
    
    if (commitMode === 'specific') {
      totalCommits = parseInt(commitCount);
    } else if (commitMode === 'random') {
      totalCommits = Math.floor(Math.random() * parseInt(commitCount)) + 1;
    } else if (commitMode === 'complete') {
      const start = moment(startDate);
      const end = moment(endDate);
      totalCommits = end.diff(start, 'days') + 1;
    } else if (commitMode === 'pattern') {
      totalCommits = 365; // Default for pattern mode
    }

    this.totalCommits = totalCommits;
    
    const spinner = ora({
      text: `Creating ${totalCommits} commits...`,
      color: 'green'
    }).start();

    try {
      await this.makeCommits(totalCommits, startDate, endDate, answers.year, spinner);
      spinner.succeed(chalk.green(`Successfully created ${this.commitsMade} commits! 🎉`));
      
      // Push to remote
      const pushSpinner = ora('Pushing commits to remote...').start();
      await git.push();
      pushSpinner.succeed('Commits pushed to remote repository!');
      
    } catch (error) {
      spinner.fail(chalk.red(`Error creating commits: ${error.message}`));
    }
  }

  async makeCommits(n, startDate, endDate, year, spinner) {
    if (n <= 0) return;

    const start = moment(startDate);
    const end = moment(endDate);
    const totalDays = end.diff(start, 'days') + 1;
    
    // Generate random date within the range
    const randomDayOffset = Math.floor(Math.random() * totalDays);
    const commitDate = moment(start).add(randomDayOffset, 'days');
    
    // Set the year explicitly
    commitDate.year(parseInt(year));

    const formattedDate = commitDate.format('YYYY-MM-DD HH:mm:ss');
    const data = { date: formattedDate };

    try {
      await jsonfile.writeFile(path, data);
      await git.add([path]);
      await git.commit(formattedDate, { '--date': formattedDate });
      
      this.commitsMade++;
      
      // Update spinner text
      const progress = Math.round((this.commitsMade / this.totalCommits) * 100);
      spinner.text = `Creating commits... ${this.commitsMade}/${this.totalCommits} (${progress}%)`;
      
      // Continue with next commit
      await this.makeCommits(n - 1, startDate, endDate, year, spinner);
      
    } catch (error) {
      console.error(chalk.red(`Error making commit: ${error.message}`));
    }
  }
}

async function main() {
  const manager = new CommitManager();
  await manager.promptUser();
}

main().catch(console.error);