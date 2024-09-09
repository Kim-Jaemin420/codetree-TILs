const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : '백준알고리즘/input.txt';
const stdin = fs.readFileSync(filePath).toString().split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const N = +input();
const graph = Array.from(Array(N), () => input().split(" ").map(Number));
const dp = Array.from(Array(N), () => Array(N).fill(0));

dp[0][0] = graph[0][0];

for (let i = 0; i < N; i += 1) {
    for (let j = 0; j < N; j += 1) {
        if (i === 0 && j === 0) continue;

        if (i === 0) dp[i][j] = Math.min(dp[i][j - 1], graph[i][j]);
        if (i > 0 && j === 0) dp[i][j] = Math.min(dp[i - 1][j], graph[i][j]);
        if (i > 0 && j > 0) dp[i][j] = Math.max(Math.min(dp[i][j - 1], graph[i][j]), Math.min(dp[i - 1][j], graph[i][j]));
    }
}

console.log(dp[N - 1][N - 1]);