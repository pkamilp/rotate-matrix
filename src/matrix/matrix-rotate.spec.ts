import assert from "assert";
import { MatrixRotate } from "./matrix-rotate";
import { randomInt } from "crypto";

describe("MatrixRotate", () => {
  const rotator = new MatrixRotate();

  const randomArray = (length: number): number[] => {
    return Array(length).fill(randomInt(0, 10));
  };

  it("returns empty array for invalid array length", async () => {
    assert.deepEqual(rotator.rotate(randomArray(0)), { rotated: [], isValid: false });
    assert.deepEqual(rotator.rotate(randomArray(1)), { rotated: [], isValid: false });
    assert.deepEqual(rotator.rotate(randomArray(2)), { rotated: [], isValid: false });
    assert.deepEqual(rotator.rotate(randomArray(3)), { rotated: [], isValid: false });
    assert.deepEqual(rotator.rotate(randomArray(5)), { rotated: [], isValid: false });
    assert.deepEqual(rotator.rotate(randomArray(6)), { rotated: [], isValid: false });
    assert.deepEqual(rotator.rotate(randomArray(7)), { rotated: [], isValid: false });
    assert.deepEqual(rotator.rotate(randomArray(8)), { rotated: [], isValid: false });
    assert.deepEqual(rotator.rotate(randomArray(10)), { rotated: [], isValid: false });
    assert.deepEqual(rotator.rotate(randomArray(11)), { rotated: [], isValid: false });
    assert.deepEqual(rotator.rotate(randomArray(15)), { rotated: [], isValid: false });
    assert.deepEqual(rotator.rotate(randomArray(20)), { rotated: [], isValid: false });
    assert.deepEqual(rotator.rotate(randomArray(24)), { rotated: [], isValid: false });
    assert.deepEqual(rotator.rotate(randomArray(50)), { rotated: [], isValid: false });
  });
});
