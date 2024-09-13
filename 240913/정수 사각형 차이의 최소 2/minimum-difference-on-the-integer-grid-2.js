const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '백준알고리즘/input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const n = parseInt(input[0]);
const graph = input.slice(1).map(line => line.split(' ').map(Number));

const dp = Array.from({length: n}, () => Array(n).fill(null));

dp[0][0] = [graph[0][0], graph[0][0]];

for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < n; j += 1) {
        if (i === 0 && j === 0) continue;

        const current = graph[i][j];
        let fromTop = i > 0 ? dp[i-1][j] : null;
        let fromLeft = j > 0 ? dp[i][j-1] : null;

        if (fromTop && fromLeft) {
            const diffTop = Math.max(fromTop[1], current) - Math.min(fromTop[0], current);
            const diffLeft = Math.max(fromLeft[1], current) - Math.min(fromLeft[0], current);
            
            if (diffTop <= diffLeft) {
                dp[i][j] = [Math.min(fromTop[0], current), Math.max(fromTop[1], current)];
            } else {
                dp[i][j] = [Math.min(fromLeft[0], current), Math.max(fromLeft[1], current)];
            }
        } else if (fromTop) {
            dp[i][j] = [Math.min(fromTop[0], current), Math.max(fromTop[1], current)];
        } else {
            dp[i][j] = [Math.min(fromLeft[0], current), Math.max(fromLeft[1], current)];
        }
    }
}

console.log(dp[n-1][n-1][1] - dp[n-1][n-1][0]);