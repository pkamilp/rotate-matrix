import assert from "assert";
import { randomInt } from "crypto";
import { MatrixRotate } from "./matrix-rotate";
import { RotateLeftStrategy } from "./strategy/rotate-left.strategy";

describe("MatrixRotate", () => {
  const rotator = new MatrixRotate(new RotateLeftStrategy());

  const randomArray = (length: number): number[] => {
    return Array(length).fill(randomInt(0, 10));
  };

  it("returns empty array for invalid array length", () => {
    assert.deepEqual(rotator.rotate(randomArray(0)), { rotated: [], isValid: false });
    assert.deepEqual(rotator.rotate(randomArray(2)), { rotated: [], isValid: false });
    assert.deepEqual(rotator.rotate(randomArray(3)), { rotated: [], isValid: false });
    assert.deepEqual(rotator.rotate(randomArray(5)), { rotated: [], isValid: false });
  });

  it("correctly rotates array with proper isValid status", () => {
    assert.deepEqual(rotator.rotate([314]), { rotated: [314], isValid: true });
    assert.deepEqual(rotator.rotate([0, 2, 3, 4]), { rotated: [2, 4, 0, 3], isValid: true });
  });
});
