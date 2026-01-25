import inquirer from "inquirer";
import chalk from "chalk";
import ora from "ora";
import moment from "moment";
import simpleGit from "simple-git";
import jsonfile from "jsonfile";
import path from "path";
import { ConventionalCommitGenerator } from "./lib/conventional-commits";
import { FormData, CommitData } from "./types/index";
import fs from "fs";

interface PromptAnswers {
  year: string;
  commitMode: string;
  commitCount: string;
  startDate: string;
  endDate: string;
  confirm: boolean;
}

class CommitManager {
  private commitsMade: number = 0;
  private totalCommits: number = 0;
  private git: any;
  private greenPath: string;
  private commitGenerator: ConventionalCommitGenerator;

  constructor() {
    const greenDir = path.join(process.cwd(), "green");
    if (!fs.existsSync(greenDir)) {
      fs.mkdirSync(greenDir);
    }
    if (!fs.existsSync(path.join(greenDir, ".git"))) {
      const { execSync } = require("child_process");
      execSync("git init", { cwd: greenDir });
    }
    this.git = simpleGit(greenDir);
    this.greenPath = path.join(greenDir, "commit-data.json");
    this.commitGenerator = new ConventionalCommitGenerator();
  }

  async promptUser(): Promise<void> {
    console.log(
      chalk.cyan.bold(
        "\nGit Commit Manager - Make Your GitHub Profile Green!\n",
      ),
    );

    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "year",
        message: "Which year would you like to make commits in?",
        default: () => (new Date().getFullYear() - 1).toString(),
        validate: (input: string) => {
          const year = parseInt(input);
          const currentYear = new Date().getFullYear();
          if (year < 1970 || year > currentYear) {
            return `Please enter a valid year between 1970 and ${currentYear}`;
          }
          return true;
        },
      },
      {
        type: "list",
        name: "commitMode",
        message: "How would you like to make commits?",
        choices: [
          { name: "Random number of commits", value: "random" },
          { name: "Specific number of commits", value: "specific" },
          { name: "Complete range (every day)", value: "complete" },
          { name: "Custom pattern", value: "pattern" },
        ],
        default: "specific",
      },
      {
        type: "input",
        name: "commitCount",
        message: "How many commits would you like to make?",
        default: "100",
        validate: (input: string, answers: any) => {
          if (
            answers.commitMode === "specific" ||
            answers.commitMode === "random"
          ) {
            const count = parseInt(input);
            if (count < 1 || count > 1000) {
              return "Please enter a number between 1 and 1000";
            }
            return true;
          }
          return true;
        },
        when: (answers: any) =>
          answers.commitMode === "specific" || answers.commitMode === "random",
      },
      {
        type: "input",
        name: "startDate",
        message: "Start date (YYYY-MM-DD)",
        default: (answers: any) => `${answers.year}-01-01`,
        validate: (input: string, answers: any) => {
          const date = moment(input);
          if (!date.isValid()) {
            return "Please enter a valid date in YYYY-MM-DD format";
          }
          if (date.year() !== parseInt(answers.year)) {
            return `Date must be in the year ${answers.year}`;
          }
          return true;
        },
      },
      {
        type: "input",
        name: "endDate",
        message: "End date (YYYY-MM-DD)",
        default: (answers: any) => `${answers.year}-12-31`,
        validate: (input: string, answers: any) => {
          const date = moment(input);
          if (!date.isValid()) {
            return "Please enter a valid date in YYYY-MM-DD format";
          }
          if (date.year() !== parseInt(answers.year)) {
            return `Date must be in the year ${answers.year}`;
          }
          if (date.isBefore(moment(answers.startDate))) {
            return "End date must be after start date";
          }
          return true;
        },
      },
      {
        type: "confirm",
        name: "confirm",
        message: (answers: PromptAnswers) => {
          const summary = this.generateSummary(answers);
          return chalk.yellow(
            `Confirm settings:\n${summary}\nProceed with these commits?`,
          );
        },
        default: true,
      },
    ] as any);

    if (answers.confirm) {
      await this.executeCommits(answers as PromptAnswers);
    } else {
      console.log(chalk.red("Operation cancelled."));
    }
  }

  private generateSummary(answers: PromptAnswers): string {
    const { year, commitMode, commitCount, startDate, endDate } = answers;
    let summary = `Year: ${year}\n`;
    summary += `Mode: ${commitMode}\n`;
    summary += `Directory: ./green\n`;

    if (commitMode === "specific") {
      summary += ` Commits: ${commitCount}\n`;
    } else if (commitMode === "random") {
      const max = parseInt(commitCount);
      summary += `Random commits: 1-${max}\n`;
    }

    summary += `Range: ${startDate} to ${endDate}`;
    return summary;
  }

  private async executeCommits(answers: PromptAnswers): Promise<void> {
    const { commitMode, commitCount, startDate, endDate, year } = answers;

    let totalCommits = 0;

    if (commitMode === "specific") {
      totalCommits = parseInt(commitCount);
    } else if (commitMode === "random") {
      totalCommits = Math.floor(Math.random() * parseInt(commitCount)) + 1;
    } else if (commitMode === "complete") {
      const start = moment(startDate);
      const end = moment(endDate);
      totalCommits = end.diff(start, "days") + 1;
    } else if (commitMode === "pattern") {
      totalCommits = 365;
    }

    this.totalCommits = totalCommits;

    const spinner = ora({
      text: `Creating ${totalCommits} commits...`,
      color: "green",
    }).start();

    try {
      await this.makeCommits(totalCommits, startDate, endDate, year, spinner);
      spinner.succeed(
        chalk.green(
          `Successfully created ${this.commitsMade} commits in local repository! 🎉`,
        ),
      );
    } catch (error) {
      spinner.fail(chalk.red(`Error creating commits: ${error}`));
    }
  }

  private async makeCommits(
    n: number,
    startDate: string,
    endDate: string,
    year: string,
    spinner: any,
  ): Promise<void> {
    if (n <= 0) return;

    const commitMessages = this.commitGenerator.generateWorkflowCommits(n);

    for (let i = 0; i < n; i++) {
      try {
        const start = moment(startDate);
        const end = moment(endDate);
        const totalDays = end.diff(start, "days") + 1;

        const randomDayOffset = Math.floor(Math.random() * totalDays);
        const commitDate = moment(start).add(randomDayOffset, "days");
        commitDate.year(parseInt(year));

        const formattedDate = commitDate.format("YYYY-MM-DD HH:mm:ss");
        const commitMessage =
          commitMessages[i % commitMessages.length] ||
          "chore: add generated file";
        const fileName = `commit-${i + 1}.txt`;
        const filePath = path.join(path.dirname(this.greenPath), fileName);
        const data: CommitData = {
          date: formattedDate,
          message: commitMessage,
          index: i + 1,
        };

        await jsonfile.writeFile(filePath, data);
        await this.git.add([filePath]);
        await this.git.commit(commitMessage, { "--date": formattedDate });

        this.commitsMade++;

        const progress = Math.round(
          (this.commitsMade / this.totalCommits) * 100,
        );
        spinner.text = `Creating commits... ${this.commitsMade}/${this.totalCommits} (${progress}%)`;
      } catch (error) {
        console.error(chalk.red(`Error making commit: ${error}`));
      }
    }
  }
}

async function main(): Promise<void> {
  const manager = new CommitManager();
  await manager.promptUser();
}

main().catch(console.error);
