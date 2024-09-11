const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : '백준알고리즘/input.txt';
const stdin = fs.readFileSync(filePath).toString().split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const n = +input();
const graph = Array.from(Array(n), () => input().split(" ").map(Number));
const dp = Array.from(Array(n), () => Array(n).fill(null).map(() => []));

// Initialize the first cell
dp[0][0] = [{min: graph[0][0], max: graph[0][0]}];

// Fill the dp table
for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < n; j += 1) {
        if (i === 0 && j === 0) continue;

        let paths = [];
        if (i > 0) {
            paths = paths.concat(dp[i-1][j].map(path => ({
                min: Math.min(path.min, graph[i][j]),
                max: Math.max(path.max, graph[i][j])
            })));
        }
        if (j > 0) {
            paths = paths.concat(dp[i][j-1].map(path => ({
                min: Math.min(path.min, graph[i][j]),
                max: Math.max(path.max, graph[i][j])
            })));
        }
        dp[i][j] = paths;
    }
}

// Find the minimum difference
let minDiff = Infinity;
for (let path of dp[n-1][n-1]) {
    minDiff = Math.min(minDiff, path.max - path.min);
}

console.log(minDiff);