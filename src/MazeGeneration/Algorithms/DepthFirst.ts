import { Maze, CellData, getNeighbors, clearWallsBetween } from "../Maze";

interface DepthFirstCell extends CellData {
  visited: boolean;
}

const animTime = 50;

export default function DepthFirst(grid: Maze): number {
  const cellState: DepthFirstCell[][] = [];

  grid.forEach((row) => {
    cellState.push(
      row.map((c) => {
        return { visited: false, ...c };
      })
    );
  });

  let currCell = cellState.at(0)?.at(0)!;
  const visitStack: DepthFirstCell[] = [currCell];

  let i = 0;
  while (visitStack.length > 0) {
    currCell.visited = true;
    const freeNeighbors = getNotVisitedNeighbors(cellState, currCell);

    if (freeNeighbors.length === 0) {
      currCell = visitStack.pop()!;
      continue;
    }

    const nextCell = freeNeighbors.at(
      Math.floor(Math.random() * freeNeighbors.length)
    )!;

    clearWallsBetween(currCell, nextCell, animTime * i++);
    visitStack.push(currCell);
    currCell = nextCell;
  }

  return animTime * i;
}

function getNotVisitedNeighbors(
  maze: Maze,
  c: DepthFirstCell
): DepthFirstCell[] {
  const neighbors = getNeighbors(maze, c) as DepthFirstCell[];
  return neighbors.filter((it) => !it.visited);
}
