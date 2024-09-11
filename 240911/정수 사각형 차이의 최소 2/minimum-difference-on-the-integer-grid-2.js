const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '백준알고리즘/input.txt';
const stdin = fs.readFileSync(filePath).toString().split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const n = +input();
const graph = Array.from(Array(n), () => input().split(" ").map(Number));
const dp = Array.from(Array(n), () => Array(n).fill(null).map(() => ({min: Infinity, max: -Infinity})));

dp[0][0] = {min: graph[0][0], max: graph[0][0]};

for (let j = 1; j < n; j += 1) {
    dp[0][j] = {
        min: Math.min(dp[0][j-1].min, graph[0][j]),
        max: Math.max(dp[0][j-1].max, graph[0][j])
    };
}

for (let i = 1; i < n; i += 1) {
    dp[i][0] = {
        min: Math.min(dp[i-1][0].min, graph[i][0]),
        max: Math.max(dp[i-1][0].max, graph[i][0])
    };
}

for (let i = 1; i < n; i += 1) {
    for (let j = 1; j < n; j += 1) {
        const fromTop = dp[i-1][j];
        const fromLeft = dp[i][j-1];

        const diffTop = fromTop.max - fromTop.min;
        const diffLeft = fromLeft.max - fromLeft.min;

        if (diffTop <= diffLeft) {
            dp[i][j] = {
                min: Math.min(fromTop.min, graph[i][j]),
                max: Math.max(fromTop.max, graph[i][j])
            };
        } else {
            dp[i][j] = {
                min: Math.min(fromLeft.min, graph[i][j]),
                max: Math.max(fromLeft.max, graph[i][j])
            };
        }
    }
}

console.log(dp[n-1][n-1].max - dp[n-1][n-1].min);