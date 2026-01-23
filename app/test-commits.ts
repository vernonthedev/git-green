import { ConventionalCommitGenerator } from './lib/conventional-commits';
import { FormData, CommitData } from './types';

const generator = new ConventionalCommitGenerator();

console.log('🌱 Angular Conventional Commit Examples:');
console.log('='.repeat(50));

// Generate 10 example commits
const commits = generator.generateWorkflowCommits(10);

commits.forEach((commit, index) => {
  console.log(`${index + 1}. ${commit}`);
  console.log('-'.repeat(30));
});

console.log('\n🎯 Different Commit Types Examples:');
console.log('='.repeat(50));

console.log('\n📝 Feature:');
console.log(generator.generateFeatureCommit());

console.log('\n🐛 Bug Fix:');
console.log(generator.generateBugFixCommit());

console.log('\n🔧 Refactor:');
console.log(generator.generateRefactorCommit());

console.log('\n✅ Test:');
console.log(generator.generateTestCommit());

console.log('\n🛠️  Chore:');
console.log(generator.generateChoreCommit());