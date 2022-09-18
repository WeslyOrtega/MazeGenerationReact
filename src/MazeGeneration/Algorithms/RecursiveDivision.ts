import {
  clearWallsBetween,
  drawWallsBetween,
  getNeighbors,
  Maze,
} from "../Maze";

const animTime = 50;

export default function RecursiveDivision(grid: Maze): number {
  // Clear grid
  grid.forEach((row) => {
    row.forEach((c) => {
      getNeighbors(grid, c).forEach((it) => clearWallsBetween(c, it));
    });
  });

  let i = 0;
  const _cols = grid[0].length;
  const _rows = grid.length;
  function divide(
    fromRow: number,
    toRow: number,
    fromCol: number,
    toCol: number,
    preferDir?: "row" | "col"
  ) {
    if (fromRow === toRow || fromCol === toCol) {
      return;
    }

    // Area is longer vertically
    if (toRow - fromRow > toCol - fromCol || preferDir === "row") {
      const splitRow = Math.floor(Math.random() * (toRow - fromRow) + fromRow);
      setWallAtRow(grid, splitRow, fromCol, toCol, animTime * i++);
      const pathCol = Math.floor(Math.random() * (toCol - fromCol) + fromCol);
      clearWallsBetween(
        grid.at(splitRow)!.at(pathCol)!,
        grid.at(splitRow + 1)!.at(pathCol)!,
        animTime * i++
      );
      divide(fromRow, splitRow, fromCol, toCol);
      divide(splitRow + 1, toRow, fromCol, toCol);
    } else if (toRow - fromRow < toCol - fromCol || preferDir === "col") {
      const splitCol = Math.floor(Math.random() * (toCol - fromCol) + fromCol);
      setWallAtCol(grid, splitCol, fromRow, toRow, animTime * i++);
      const pathRow = Math.floor(Math.random() * (toRow - fromRow) + fromRow);
      clearWallsBetween(
        grid.at(pathRow)!.at(splitCol)!,
        grid.at(pathRow)!.at(splitCol + 1)!,
        animTime * i++
      );
      divide(fromRow, toRow, fromCol, splitCol);
      divide(fromRow, toRow, splitCol + 1, toCol);
    } else {
      if (Math.floor(Math.random() * 2) === 1) {
        divide(fromRow, toRow, fromCol, toCol, "row");
      } else {
        divide(fromRow, toRow, fromCol, toCol, "col");
      }
    }
  }

  divide(0, _rows - 1, 0, _cols - 1);
  return animTime * i++;
}

function setWallAtCol(
  grid: Maze,
  col: number,
  fromRow: number,
  toRow: number,
  delay: number
) {
  grid.forEach((row, i) => {
    if (i >= fromRow && i <= toRow) {
      const c = row.at(col)!;
      const c_next = row.at(col + 1)!;
      drawWallsBetween(c, c_next, delay);
    }
  });
}

function setWallAtRow(
  grid: Maze,
  row: number,
  fromCol: number,
  toCol: number,
  delay: number
) {
  grid.at(row)!.forEach((c, i) => {
    if (i >= fromCol && i <= toCol) {
      const c_next = grid.at(row + 1)!.at(i)!;
      drawWallsBetween(c, c_next, delay);
    }
  });
}
