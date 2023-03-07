import { RotateStrategy } from "./strategy/rotate.strategy";

export interface Matrix {
  rotate(strategy: RotateStrategy): Matrix;
  getRowsNumber(): number;
  getColumnsNumber(): number;
  getData(): number[][];
  getRawData(): number[];
}
