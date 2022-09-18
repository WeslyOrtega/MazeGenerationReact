import { CellData, clearWallsBetween, getNeighbors, Maze } from "../Maze";

const g = new Map<CellData, CellData[]>();
const animTime = 50;

export default function Eller(grid: Maze): number {
  let i = 0;
  grid.forEach((row, j) => {
    // Assign groups
    row.forEach((c) => {
      if (!g.has(c)) {
        g.set(c, [c]);
      }
    });

    // Randomly merge horizontally adjacent cells
    row.forEach((c) => {
      const adj = getAdjacentOfDiffGroup(grid, c);
      if (
        adj &&
        (j === grid.length - 1 || Math.floor(Math.random() * 2) === 1)
      ) {
        clearWallsBetween(c, adj, animTime * i++);
        mergeCellGroups(c, adj);
      }
    });

    // Randomly merge vertically ajdacent cells
    const groups: CellData[][] = [];
    let skip: CellData[] = [];
    row.forEach((c) => {
      if (!skip.includes(c)) {
        groups.push(g.get(c)!);
        skip = skip.concat(g.get(c)!);
      }
    });

    groups.forEach((g) => {
      const cellsOfGroup = row.filter((it) => g.includes(it));
      const c = cellsOfGroup.at(
        Math.floor(Math.random() * cellsOfGroup.length)
      )!;
      mergeCellDown(grid, c, animTime * i++);
      cellsOfGroup.forEach((c) => {
        if (Math.floor(Math.random() * 2) === 1) {
          mergeCellDown(grid, c, animTime * i++);
        }
      });
    });
  });

  return animTime * i++;
}

function getAdjacentOfDiffGroup(grid: Maze, c: CellData) {
  const neighbors = getNeighbors(grid, c);
  return neighbors
    .filter((it) => !g.get(c)!.includes(it) && it.col === c.col + 1)
    .pop();
}

function mergeCellGroups(c1: CellData, c2: CellData) {
  const tmp = Array.from(new Set([...g.get(c1)!, ...g.get(c2)!]));
  g.get(c1)!.forEach((c) => g.set(c, tmp));
  g.get(c2)!.forEach((c) => g.set(c, tmp));
}

function mergeCellDown(grid: Maze, c: CellData, delay: number) {
  const neighbors = getNeighbors(grid, c);
  const botCell = neighbors
    .filter((it) => it.row === c.row + 1 && !g.get(c)!.includes(it))
    .pop();
  if (botCell) {
    clearWallsBetween(c, botCell, delay);
    g.get(c)!.push(botCell);
    g.set(botCell, g.get(c)!);
  }
}
