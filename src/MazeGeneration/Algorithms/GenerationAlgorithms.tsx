import { Maze } from "../Maze";
import BinaryTree from "./BinaryTree";
import DepthFirst from "./DepthFirst";
import Eller from "./Eller";
import RecursiveDivision from "./RecursiveDivision";
import Sidewinder from "./Sidewinder";

/**
 * @param m Maze object to generate in
 * @returns The time, in ms, that it will take for the generation
 * animation to finish playing
 */
export type GenerationAlgorithm = (m: Maze) => number;

export const DepthFirstGeneration: GenerationAlgorithm = DepthFirst;
export const EllerGeneration: GenerationAlgorithm = Eller;
export const RecursiveDivisionGeneration: GenerationAlgorithm =
  RecursiveDivision;
export const BinaryTreeGeneration: GenerationAlgorithm = BinaryTree;
export const SidewinderGeneration: GenerationAlgorithm = Sidewinder;
