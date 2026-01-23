import jsonfile from 'jsonfile';
import moment from 'moment';
import simpleGit from 'simple-git';
import random from 'random';
import path from 'path';

const greenPath = path.join(process.cwd(), 'green', 'data.json');
const git = simpleGit(path.join(process.cwd(), 'green'));

interface CommitData {
  date: string;
}

const markCommit = (x: number, y: number): void => {
  const date = moment()
    .subtract(1, "y")
    .add(1, "d")
    .add(x, "w")
    .add(y, "d")
    .format();

  const data: CommitData = {
    date: date,
  };

  jsonfile.writeFile(greenPath, data, () => {
    git.add([greenPath]).commit(date, { "--date": date }).push();
  });
};

const makeCommits = (n: number): void => {
  if(n === 0) return git.push();
  const x = random.int(0, 54);
  const y = random.int(0, 6);
  const date = moment().subtract(1, "y").add(1, "d").add(x, "w").add(y, "d").format();

  const data: CommitData = {
    date: date,
  };
  console.log(date);
  jsonfile.writeFile(greenPath, data, () => {
    git.add([greenPath]).commit(date, { "--date": date }, () => makeCommits(--n));
  });
};

makeCommits(100);