import { RotateStrategy } from "./rotate.strategy";
import { Matrix } from "../matrix";

export class RotateLeftStrategy implements RotateStrategy {
  rotate(matrix: Matrix): number[][] {
    let matrixData = matrix.getData();

    const circlesToRun = Math.floor(Math.min(matrix.getRowsNumber(), matrix.getColumnsNumber()) / 2);

    for (let circleIdx = 0; circleIdx < circlesToRun; circleIdx++) {
      matrixData = this.rotateCircle(matrixData, circleIdx);
    }

    return matrixData;
  }

  private rotateCircle(circle: number[][], circleIdx: number): number[][] {
    const rowsNumber = circle.length;
    const columnsNumber = circle[0].length;
    const temp = circle[circleIdx][circleIdx];

    // Rotate elements in the top row
    for (let col = circleIdx + 1; col < columnsNumber - circleIdx; col++) {
      circle[circleIdx][col - 1] = circle[circleIdx][col];
    }

    // Rotate elements in the rightmost column
    for (let row = circleIdx + 1; row < rowsNumber - circleIdx; row++) {
      circle[row - 1][columnsNumber - 1 - circleIdx] = circle[row][columnsNumber - 1 - circleIdx];
    }

    // Rotate elements in the bottom row
    for (let col = columnsNumber - 1 - circleIdx; col > circleIdx; col--) {
      circle[rowsNumber - 1 - circleIdx][col] = circle[rowsNumber - 1 - circleIdx][col - 1];
    }

    // Rotate elements in the leftmost column
    for (let row = rowsNumber - 1 - circleIdx; row > circleIdx; row--) {
      circle[row][circleIdx] = circle[row - 1][circleIdx];
    }

    // Put the temporary element back in the top row
    circle[circleIdx + 1][circleIdx] = temp;

    return circle;
  }
}
