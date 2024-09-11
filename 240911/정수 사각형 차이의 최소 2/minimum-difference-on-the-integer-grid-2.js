const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '백준알고리즘/input.txt';
const stdin = fs.readFileSync(filePath).toString().split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const n = +input();
const graph = Array.from(Array(n), () => input().split(" ").map(Number));
const dp = Array.from(Array(n), () => Array(n).fill(null));

// Initialize the first cell
dp[0][0] = { min: graph[0][0], max: graph[0][0], diff: 0 };

// Fill the dp table
for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < n; j += 1) {
        if (i === 0 && j === 0) continue;

        let fromTop = i > 0 ? dp[i-1][j] : null;
        let fromLeft = j > 0 ? dp[i][j-1] : null;

        if (fromTop && fromLeft) {
            let newFromTop = {
                min: Math.min(fromTop.min, graph[i][j]),
                max: Math.max(fromTop.max, graph[i][j])
            };
            let newFromLeft = {
                min: Math.min(fromLeft.min, graph[i][j]),
                max: Math.max(fromLeft.max, graph[i][j])
            };
            newFromTop.diff = newFromTop.max - newFromTop.min;
            newFromLeft.diff = newFromLeft.max - newFromLeft.min;

            dp[i][j] = newFromTop.diff <= newFromLeft.diff ? newFromTop : newFromLeft;
        } else if (fromTop) {
            dp[i][j] = {
                min: Math.min(fromTop.min, graph[i][j]),
                max: Math.max(fromTop.max, graph[i][j])
            };
            dp[i][j].diff = dp[i][j].max - dp[i][j].min;
        } else {
            dp[i][j] = {
                min: Math.min(fromLeft.min, graph[i][j]),
                max: Math.max(fromLeft.max, graph[i][j])
            };
            dp[i][j].diff = dp[i][j].max - dp[i][j].min;
        }
    }
}

console.log(dp[n-1][n-1].diff);