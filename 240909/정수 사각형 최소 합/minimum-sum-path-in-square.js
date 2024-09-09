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
const dp = [...graph];

for (let i = 0; i < N; i += 1) {
    for (let j = N - 1; j >= 0; j -= 1) {
        if (i === 0 && j === N - 1) continue;

        if (i === 0) dp[i][j] += dp[i][j + 1];
        if (i > 0 && j < N - 1) dp[i][j] += Math.min(dp[i - 1][j], dp[i][j + 1]);
        if (i > 0 && j === N - 1) dp[i][j] += dp[i - 1][j]; 
    }
}

console.log(dp[N - 1][0]);