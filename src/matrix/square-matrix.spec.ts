import { randomInt } from "crypto";
import assert from "assert";
import { SquareMatrix } from "./square-matrix";
import { InvalidMatrixInputError } from "../error/invalid-matrix-input.error";
import { RotateLeftStrategy } from "./strategy/rotate-left.strategy";

describe("SquareMatrix", () => {
  const validArrayLengths = [1, 4, 9, 16, 25, 36, 49, 64, 81];

  const randomArray = (length: number): number[] => {
    return Array(length).fill(randomInt(0, 10));
  };

  it("correctly creates SquareMatrix object", () => {
    validArrayLengths.forEach((arrayLength) => {
      assert(SquareMatrix.create(randomArray(arrayLength)) instanceof SquareMatrix);
    });
  });

  it("throws when SquareMatrix is created with invalid array length", async () => {
    const promises = Array.from(Array(10).keys()).map((arrayLength) => {
      return !validArrayLengths.includes(arrayLength)
        ? assert.rejects(async () => {
            SquareMatrix.create(randomArray(arrayLength));
          }, InvalidMatrixInputError)
        : Promise.resolve();
    });

    await Promise.all(promises);
  });

  it("correctly transforms raw data into square matrix", () => {
    const matrix = SquareMatrix.create([0, 1, 2, 3]);
    assert.deepEqual(matrix.getData(), [
      [0, 1],
      [2, 3],
    ]);
    assert.deepEqual(matrix.getRawData(), [0, 1, 2, 3]);
    assert.deepEqual(matrix.getRowsNumber(), 2);
    assert.deepEqual(matrix.getColumnsNumber(), 2);
  });

  it("correctly rotates SquareMatrix", () => {
    const matrix = SquareMatrix.create([1, 2, 3, 4]);
    const rotatedMatrix = matrix.rotate(new RotateLeftStrategy());

    assert.deepEqual(rotatedMatrix.getData(), [
      [2, 4],
      [1, 3],
    ]);
    assert.deepEqual(rotatedMatrix.getRawData(), [2, 4, 1, 3]);
    assert.deepEqual(rotatedMatrix.getRowsNumber(), 2);
    assert.deepEqual(rotatedMatrix.getColumnsNumber(), 2);
  });
});
