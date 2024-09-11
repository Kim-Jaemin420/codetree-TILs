const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '백준알고리즘/input.txt';
const stdin = fs.readFileSync(filePath).toString().split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line += 1];
})();

const n = +input();
const graph = Array.from(Array(n), () => input().split(" ").map(Number));
const dp = Array.from(Array(n), () => Array(n).fill(null).map(() => ({min: Infinity, max: -Infinity})));

function updateMinMax(current, newValue) {
    return {
        min: Math.min(current.min, newValue),
        max: Math.max(current.max, newValue)
    };
}

dp[0][0] = {min: graph[0][0], max: graph[0][0]};

for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < n; j += 1) {
        if (i === 0 && j === 0) continue;

        let fromTop = i > 0 ? dp[i-1][j] : null;
        let fromLeft = j > 0 ? dp[i][j-1] : null;

        if (fromTop && fromLeft) {
            let newFromTop = updateMinMax(fromTop, graph[i][j]);
            let newFromLeft = updateMinMax(fromLeft, graph[i][j]);
            let newDiffTop = newFromTop.max - newFromTop.min;
            let newDiffLeft = newFromLeft.max - newFromLeft.min;

            dp[i][j] = newDiffTop <= newDiffLeft ? newFromTop : newFromLeft;
        } else if (fromTop) {
            dp[i][j] = updateMinMax(fromTop, graph[i][j]);
        } else {
            dp[i][j] = updateMinMax(fromLeft, graph[i][j]);
        }
    }
}

console.log(dp[n-1][n-1].max - dp[n-1][n-1].min);