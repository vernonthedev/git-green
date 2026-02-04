import { NextRequest, NextResponse } from "next/server";
import moment from "moment";
import { FormData } from "../../../src/types/index";

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

    const commitDates: string[] = [];

    for (let i = 0; i < totalCommits; i++) {
      const randomDayOffset = Math.floor(
        Math.random() * (end.diff(start, "days") + 1),
      );
      const commitDate = moment(start).add(randomDayOffset, "days");
      commitDates.push(commitDate.format("YYYY-MM-DD"));
    }

    // Group by date to get counts
    const dateCounts: { [key: string]: number } = {};
    commitDates.forEach((date) => {
      dateCounts[date] = (dateCounts[date] || 0) + 1;
    });

    return NextResponse.json({ dateCounts, totalCommits });
  } catch (error) {
    console.error("Error generating preview:", error);
    return NextResponse.json(
      { error: "Failed to generate preview" },
      { status: 500 },
    );
  }
}
