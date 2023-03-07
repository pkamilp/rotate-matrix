import assert from "assert";
import { RotateLeftStrategy } from "./rotate-left.strategy";
import { SquareMatrix } from "../square-matrix";

describe("RotateLeftStrategy", () => {
  const strategy = new RotateLeftStrategy();

  it("properly rotates singleton matrix", () => {
    assert.deepEqual(strategy.rotate(SquareMatrix.create([5])), [[5]]);
    assert.deepEqual(strategy.rotate(SquareMatrix.create([-5])), [[-5]]);
  });

  it("properly rotates 2x2 matrix", () => {
    assert.deepEqual(strategy.rotate(SquareMatrix.create([40, 20, 90, 10])), [
      [20, 10],
      [40, 90],
    ]);
    assert.deepEqual(strategy.rotate(SquareMatrix.create([1, 2, 3, 4])), [
      [2, 4],
      [1, 3],
    ]);
    assert.deepEqual(strategy.rotate(SquareMatrix.create([0, 0, 0, 1])), [
      [0, 1],
      [0, 0],
    ]);
  });

  it("properly rotates 3x3 matrix", () => {
    assert.deepEqual(strategy.rotate(SquareMatrix.create([1, 2, 3, 4, 5, 6, 7, 8, 9])), [
      [2, 3, 6],
      [1, 5, 9],
      [4, 7, 8],
    ]);
  });

  it("properly rotates 4x4 matrix", () => {
    assert.deepEqual(strategy.rotate(SquareMatrix.create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 20, 100])), [
      [1, 2, 3, 7],
      [0, 6, 10, 11],
      [4, 5, 9, 100],
      [8, 12, 15, 20],
    ]);
  });

  it("properly rotates 5x5 matrix", () => {
    assert.deepEqual(
      strategy.rotate(
        SquareMatrix.create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]),
      ),
      [
        [1, 2, 3, 4, 9],
        [0, 7, 8, 13, 14],
        [5, 6, 12, 18, 19],
        [10, 11, 16, 17, 24],
        [15, 20, 21, 22, 23],
      ],
    );
  });
});
