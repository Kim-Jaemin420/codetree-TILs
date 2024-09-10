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

const bfs = (x, y) => {
    const visited = Array.from(Array(n), () => Array(n).fill(false));
    const queue = [[x, y, 1]];
    const dx = [-1, 0, 1, 0];
    const dy = [0, -1, 0, 1];
    let start = 0;

    let maxCount = 0;

    visited[x][y] = true;

    while (start < queue.length) {
        const [currentX, currentY, count] = queue[start];

        start += 1;

        for (let i = 0; i < 4; i += 1) {
            const nx = currentX + dx[i];
            const ny = currentY + dy[i];

            if (0 > nx || nx >= n || 0 > ny || ny >= n) continue;
            if (visited[nx][ny]) continue;
            if (graph[nx][ny] <= graph[currentX][currentY]) {
                maxCount = Math.max(count, maxCount);
                continue;
            }

            visited[nx][ny] =  true;
            queue.push([nx, ny, count + 1]);
        }
    }

    return maxCount;
};

let maxCount = 0;

for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < n; j += 1) {
        maxCount = Math.max(bfs(i, j), maxCount);
    }
}

console.log(maxCount);