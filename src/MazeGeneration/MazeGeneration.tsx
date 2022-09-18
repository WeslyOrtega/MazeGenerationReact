import "./MazeGeneration.css";

import { Maze, Cell, resetMaze } from "./Maze";
import {
  BinaryTreeGeneration,
  DepthFirstGeneration,
  EllerGeneration,
  GenerationAlgorithm,
  RecursiveDivisionGeneration,
  SidewinderGeneration,
} from "./Algorithms/GenerationAlgorithms";
import { useState } from "react";

const MazeDisplay = (props: {
  callback: (m: Maze) => void;
  rows: number;
  cols: number;
}) => {
  const maze: Maze = [];
  const components: JSX.Element[][] = [];

  const { callback, rows, cols } = props;

  callback(maze);

  for (let i = 0; i < rows; i++) {
    components.push([]);
    maze.push([]);
  }

  components.forEach((row, i) => {
    for (let j = 0; j < cols; j++) {
      row.push(Cell((data) => maze.at(i)!.push(data), i, j));
    }
  });

  return (
    <div className="maze-container">
      {components.map((row, i) => {
        return (
          <div className="maze-row" key={i}>
            {row}
          </div>
        );
      })}
    </div>
  );
};

const AlgorithmShowcase = (props: {
  algorithm: GenerationAlgorithm;
  algoName: string;
  desc: string;
}) => {
  let maze: Maze;
  const [isGenerateDisabled, setGenerateDisabled] = useState(false);
  const [isResetDisabled, setResetDisabled] = useState(false);

  return (
    <div className="algorithm-diplayer">
      <MazeDisplay callback={(m) => (maze = m)} rows={10} cols={10} />
      <div className="info">
        <h3>{props.algoName}</h3>
        <p>{props.desc}</p>
        <div className="buttons">
          <button
            id="generate"
            onClick={() => {
              const genDelay = props.algorithm(maze);
              setGenerateDisabled(true);
              setResetDisabled(true);
              setTimeout(() => setResetDisabled(false), genDelay);
            }}
            disabled={isGenerateDisabled}
          >
            Generate
          </button>
          <button
            id="reset"
            onClick={() => {
              resetMaze(maze);
              setGenerateDisabled(false);
            }}
            disabled={isResetDisabled}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default function MazeGeneration() {
  return (
    <div className="maze-generation">
      <h1>Maze Generation</h1>
      <div className="showcase">
        <AlgorithmShowcase
          algorithm={DepthFirstGeneration}
          algoName="Depth First Generation"
          desc="Generates mazes by randomly traversing the board, then backtracking when there is no way to go until it finds a way to go."
        />
        <AlgorithmShowcase
          algorithm={EllerGeneration}
          algoName="Eller's Algorithm"
          desc="Procedurally generates a maze by randomly merging cells with adjacent neighbors."
        />
        <AlgorithmShowcase
          algorithm={RecursiveDivisionGeneration}
          algoName="Recursive Division"
          desc="Recursively divides maze into smaller sections by placing walls."
        />
        <AlgorithmShowcase
          algorithm={BinaryTreeGeneration}
          algoName="Binary Tree Generation"
          desc="Generates mazes by randomly choosing to merge every cell either to the right or down."
        />
        <AlgorithmShowcase
          algorithm={SidewinderGeneration}
          algoName="Sidewinder Generation"
          desc="Generates mazes by randomly choosing whether to merge right. If it does not merge right, then a random cell in the current run is merged up."
        />
      </div>
    </div>
  );
}
