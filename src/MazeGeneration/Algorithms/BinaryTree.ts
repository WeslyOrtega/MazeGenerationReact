import { CellData, clearWallsBetween, getNeighbors, Maze } from "../Maze";

const animTime = 50;

export default function BinaryTree(grid: Maze): number {
  let i = 0;
  grid.forEach((row) => {
    row.forEach((c) => {
      const SWNeighbors = getSWNeighbors(grid, c);
      const toConnect = SWNeighbors.at(
        Math.floor(Math.random() * SWNeighbors.length)
      );
      if (toConnect) {
        clearWallsBetween(c, toConnect, animTime * i++);
      }
    });
  });
  return animTime * i++;
}

function getSWNeighbors(grid: Maze, c: CellData) {
  return getNeighbors(grid, c).filter(
    (it) => it.col === c.col + 1 || it.row === c.row + 1
  );
}
