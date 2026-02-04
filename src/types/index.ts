export interface CommitType {
  [key: string]: string[] | undefined;
}

export interface CommitMessage {
  type: string;
  scope?: string;
  description: string;
  body?: string;
  footer?: string;
}

export interface CommitData {
  date: string;
  message: string;
  index: number;
}

export interface FormData {
  year: string;
  commitMode: string;
  commitCount: string;
  startDate: string;
  endDate: string;
}

export type CommitMode = "random" | "specific" | "complete" | "pattern";

export type ScreenType =
  | "welcome"
  | "year"
  | "mode"
  | "count"
  | "dates"
  | "confirm"
  | "progress"
  | "success";

declare global {
  interface String {
    repeat(count: number): string;
  }
}

if (!String.prototype.repeat) {
  String.prototype.repeat = function (count: number): string {
    return new Array(count + 1).join(this);
  };
}
