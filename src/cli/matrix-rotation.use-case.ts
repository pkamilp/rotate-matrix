import { RotateStrategy } from "../matrix/strategy/rotate.strategy";
import { SquareMatrix } from "../matrix/square-matrix";
import { InvalidMatrixInputError } from "../error/invalid-matrix-input.error";

export class MatrixRotationUseCase {
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
