import { CellData, clearWallsBetween, Maze } from "../Maze";

const animTime = 50;

export default function Sidewinder(grid: Maze): number {
  let i = 0;
  grid[0].forEach((c, idx) => {
    const rCell = grid[0][idx + 1];
    if (rCell) {
      clearWallsBetween(c, rCell, animTime * i++);
    }
  });

  const cols = grid[0].length;
  grid.forEach((row, j) => {
    if (j === 0) return;

    let run: CellData[] = [];
    row.forEach((c, k) => {
      run.push(c);
      if (k === cols - 1) return;
      if (Math.floor(Math.random() * 2) === 1) {
        const rCell = row[k + 1];
        clearWallsBetween(c, rCell, animTime * i++);
      } else {
        const toMerge = run.at(Math.floor(Math.random() * run.length))!;
        const tCell = grid[j - 1][toMerge!.col];
        clearWallsBetween(toMerge, tCell, animTime * i++);
        run = [];
      }
    });
    const toMerge = run.at(Math.floor(Math.random() * run.length))!;
    const tCell = grid[j - 1][toMerge!.col];
    clearWallsBetween(toMerge, tCell, animTime * i++);
    run = [];
  });
  return animTime * i++;
}
