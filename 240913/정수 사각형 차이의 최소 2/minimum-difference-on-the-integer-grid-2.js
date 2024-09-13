const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '백준알고리즘/input.txt';
const stdin = fs.readFileSync(filePath).toString().split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const n = +input();
const graph = Array.from(Array(n), () => input().split(" ").map(Number));

const dp = Array.from(Array(n), () => Array(n).fill(null).map(() => ({ min: Infinity, max: -Infinity })));

dp[0][0] = { min: graph[0][0], max: graph[0][0] };

for (let i = 0; i < n; i += 1) {
  for (let j = 0; j < n; j += 1) {
    if (i === 0 && j === 0) continue;

    const current = graph[i][j];
    let fromTop = i > 0 ? dp[i-1][j] : null;
    let fromLeft = j > 0 ? dp[i][j-1] : null;

    if (fromTop && fromLeft) {
      dp[i][j].min = Math.min(Math.min(fromTop.min, fromLeft.min), current);
      dp[i][j].max = Math.max(Math.max(fromTop.max, fromLeft.max), current);
    } else if (fromTop) {
      dp[i][j].min = Math.min(fromTop.min, current);
      dp[i][j].max = Math.max(fromTop.max, current);
    } else {
      dp[i][j].min = Math.min(fromLeft.min, current);
      dp[i][j].max = Math.max(fromLeft.max, current);
    }
  }
}

console.log(dp[n-1][n-1].max - dp[n-1][n-1].min);