import chunk from "lodash/chunk";
import { InvalidMatrixInputError } from "../error/invalid-matrix-input.error";
import { Matrix } from "./matrix";
import { RotateStrategy } from "./strategy/rotate.strategy";

export class SquareMatrix implements Matrix {
  private readonly data: number[][] = [];
  private readonly rawNumbers: number[];
  private readonly rowsNumber: number;
  private readonly columnsNumber: number;

  private constructor(rawNumbers: number[]) {
    this.rawNumbers = rawNumbers;
    this.rowsNumber = this.columnsNumber = Math.sqrt(rawNumbers.length);

    this.data = chunk(rawNumbers, this.rowsNumber);
  }

  static create(numbers: number[]): SquareMatrix {
    if (numbers.length < 1 || !Number.isInteger(Math.sqrt(numbers.length))) {
      throw new InvalidMatrixInputError(`Cannot form square matrix from ${numbers.length} element array`);
    }

    return new SquareMatrix(numbers);
  }

  rotate(strategy: RotateStrategy): SquareMatrix {
    const rotated = strategy.rotate(this);
    return SquareMatrix.create(rotated.flatMap((arr) => arr));
  }

  getData(): number[][] {
    return this.data;
  }

  getRawData(): number[] {
    return this.rawNumbers;
  }

  getRowsNumber(): number {
    return this.rowsNumber;
  }

  getColumnsNumber(): number {
    return this.columnsNumber;
  }
}
