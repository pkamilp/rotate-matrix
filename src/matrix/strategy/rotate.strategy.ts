import { Matrix } from "../matrix";

export interface RotateStrategy {
  rotate(matrix: Matrix): number[][];
}
