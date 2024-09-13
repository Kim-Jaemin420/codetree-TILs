const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '백준알고리즘/input.txt';
const stdin = fs.readFileSync(filePath).toString().split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const n = +input();
const graph = Array.from(Array(n), () => input().split(" ").map(Number));

const dp = Array.from(Array(n), () => 
  Array.from(Array(n), () => 
    Array.from(Array(101), () => Array(101).fill(Infinity))
  )
);

dp[0][0][graph[0][0]][graph[0][0]] = 0;

for (let i = 0; i < n; i += 1) {
  for (let j = 0; j < n; j += 1) {
    const current = graph[i][j];
    
    for (let min = 0; min <= 100; min++) {
      for (let max = min; max <= 100; max++) {
        if (dp[i][j][min][max] === Infinity) continue;

        if (j + 1 < n) {
          const newMin = Math.min(min, current);
          const newMax = Math.max(max, current);
          dp[i][j+1][newMin][newMax] = Math.min(
            dp[i][j+1][newMin][newMax],
            newMax - newMin
          );
        }
        
        if (i + 1 < n) {
          const newMin = Math.min(min, current);
          const newMax = Math.max(max, current);
          dp[i+1][j][newMin][newMax] = Math.min(
            dp[i+1][j][newMin][newMax],
            newMax - newMin
          );
        }
      }
    }
  }
}

let result = Infinity;
for (let min = 0; min <= 100; min += 1) {
  for (let max = min; max <= 100; max += 1) {
    if (dp[n-1][n-1][min][max] !== Infinity) {
      result = Math.min(result, dp[n-1][n-1][min][max]);
    }
  }
}

console.log(result);