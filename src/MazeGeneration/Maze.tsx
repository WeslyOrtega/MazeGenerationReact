import { useState } from "react";

export interface CellData {
  row: number;
  col: number;
  setTWall: (wallState: boolean) => void;
  setRWall: (wallState: boolean) => void;
  setBWall: (wallState: boolean) => void;
  setLWall: (wallState: boolean) => void;
}

export const Cell = (
  callback: (c: CellData) => void,
  row: number,
  col: number
) => {
  const [tWall, setTWall] = useState(true);
  const [rWall, setRWall] = useState(true);
  const [bWall, setBWall] = useState(true);
  const [lWall, setLWall] = useState(true);

  callback({
    row: row,
    col: col,
    setTWall: setTWall,
    setRWall: setRWall,
    setBWall: setBWall,
    setLWall: setLWall,
  });

  const className = `${tWall ? "cell-twall" : ""} ${
    rWall ? "cell-rwall" : ""
  } ${bWall ? "cell-bwall" : ""} ${lWall ? "cell-lwall" : ""}`;

  return <div className={`cell ${className}`} key={col}></div>;
};

export type Maze = CellData[][];

export function getNeighbors(maze: Maze, c: CellData): CellData[] {
  const neighbors: CellData[] = [];

  if (c.row > 0) {
    neighbors.push(maze[c.row - 1]![c.col]!);
  }

  if (c.row < maze.length - 1) {
    neighbors.push(maze[c.row + 1]![c.col]!);
  }

  if (c.col > 0) {
    neighbors.push(maze[c.row]![c.col - 1]!);
  }

  if (c.col < maze.at(0)?.length! - 1) {
    neighbors.push(maze[c.row]![c.col + 1]!);
  }

  return neighbors;
}

export function resetMaze(maze: Maze) {
  maze.forEach((row) => {
    row.forEach((c) => {
      c.setTWall(true);
      c.setRWall(true);
      c.setBWall(true);
      c.setLWall(true);
    });
  });
}

function setWallsBetween(
  c1: CellData,
  c2: CellData,
  state: boolean,
  delay?: number
) {
  const _delay = delay ?? 0;
  if (c1.col === c2.col) {
    if (c1.row + 1 === c2.row) {
      setTimeout(() => c1.setBWall(state), _delay);
      setTimeout(() => c2.setTWall(state), _delay);
    } else {
      setTimeout(() => c1.setTWall(state), _delay);
      setTimeout(() => c2.setBWall(state), _delay);
    }
  } else {
    if (c1.col + 1 === c2.col) {
      setTimeout(() => c1.setRWall(state), _delay);
      setTimeout(() => c2.setLWall(state), _delay);
    } else {
      setTimeout(() => c1.setLWall(state), _delay);
      setTimeout(() => c2.setRWall(state), _delay);
    }
  }
}

export function clearWallsBetween(c1: CellData, c2: CellData, delay?: number) {
  setWallsBetween(c1, c2, false, delay);
}

export function drawWallsBetween(c1: CellData, c2: CellData, delay?: number) {
  setWallsBetween(c1, c2, true, delay);
}
