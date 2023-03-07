import { RotateStrategy } from "./strategy/rotate.strategy";
import { SquareMatrix } from "./square-matrix";
import { InvalidMatrixInputError } from "../error/invalid-matrix-input.error";

export class MatrixRotate {
  constructor(private readonly strategy: RotateStrategy) {}

  rotate(data: number[]): { rotated: number[]; isValid: boolean } {
    try {
      const matrix = SquareMatrix.create(data);
      const rotatedMatrix = matrix.rotate(this.strategy);

      return { rotated: rotatedMatrix.getRawData(), isValid: true };
    } catch (error) {
      if (error instanceof InvalidMatrixInputError) {
        return { rotated: [], isValid: false };
      }

      throw error;
    }
  }
}
