const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '백준알고리즘/input.txt';
const stdin = fs.readFileSync(filePath).toString().split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const n = +input();
const graph = Array.from(Array(n), () => input().split(" ").map(Number));
const dp = Array.from(Array(n), () => Array(n).fill(-1));

const dx = [-1, 0, 1, 0];
const dy = [0, -1, 0, 1];

const dfs = (x, y) => {
    if (dp[x][y] !== -1) return dp[x][y];

    let maxLength = 1;

    for (let i = 0; i < 4; i += 1) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (0 > nx || nx >= n || 0 > ny || ny >= n) continue;
        if (graph[nx][ny] <= graph[x][y]) continue;

        maxLength = Math.max(maxLength, dfs(nx, ny) + 1);
    }

    dp[x][y] = maxLength;

    return maxLength;
};


let maxCount = 0;

for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        maxCount = Math.max(maxCount, dfs(i, j));
    }
}

console.log(maxCount);