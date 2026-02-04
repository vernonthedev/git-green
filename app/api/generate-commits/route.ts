import { NextRequest, NextResponse } from "next/server";
import moment from "moment";
import simpleGit from "simple-git";
import jsonfile from "jsonfile";
import path from "path";
import fs from "fs";
import { ConventionalCommitGenerator } from "../../../src/lib/conventional-commits";
import { FormData, CommitData } from "../../../src/types/index";

export async function POST(request: NextRequest) {
  try {
    const formData: FormData = await request.json();

    const { year, commitMode, commitCount, startDate, endDate } = formData;

    // Set defaults
    const start = startDate ? moment(startDate) : moment(`${year}-01-01`);
    const end = endDate ? moment(endDate) : moment(`${year}-12-31`);

    let totalCommits = 0;

    if (commitMode === "specific") {
      totalCommits = parseInt(commitCount);
    } else if (commitMode === "random") {
      totalCommits = Math.floor(Math.random() * parseInt(commitCount)) + 1;
    } else if (commitMode === "complete") {
      totalCommits = end.diff(start, "days") + 1;
    } else if (commitMode === "pattern") {
      totalCommits = 365;
    }

    // Setup green directory
    const greenDir = path.join(process.cwd(), "green");
    if (!fs.existsSync(greenDir)) {
      fs.mkdirSync(greenDir);
    }
    if (!fs.existsSync(path.join(greenDir, ".git"))) {
      const { execSync } = require("child_process");
      execSync("git init", { cwd: greenDir });
    }

    const git = simpleGit(greenDir);
    const commitGenerator = new ConventionalCommitGenerator();
    const commitMessages =
      commitGenerator.generateWorkflowCommits(totalCommits);

    let commitsMade = 0;

    for (let i = 0; i < totalCommits; i++) {
      const randomDayOffset = Math.floor(
        Math.random() * (end.diff(start, "days") + 1),
      );
      const commitDate = moment(start).add(randomDayOffset, "days");
      commitDate.year(parseInt(year));

      const formattedDate = commitDate.format("YYYY-MM-DD HH:mm:ss");
      const commitMessage =
        commitMessages[i % commitMessages.length] ||
        "chore: add generated file";
      const fileName = `commit-${i + 1}.txt`;
      const filePath = path.join(greenDir, fileName);
      const data: CommitData = {
        date: formattedDate,
        message: commitMessage,
        index: i + 1,
      };

      await jsonfile.writeFile(filePath, data);
      await git.add([filePath]);
      await git.commit(commitMessage, { "--date": formattedDate });

      commitsMade++;
    }

    return NextResponse.json({ success: true, commitsMade });
  } catch (error) {
    console.error("Error generating commits:", error);
    return NextResponse.json(
      { error: "Failed to generate commits" },
      { status: 500 },
    );
  }
}
