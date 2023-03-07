import assert from "assert";
import { CliHandler } from "./cli-handler";

describe("CLI Handler", () => {
  it("properly runs for sample data", () => {
    const handler = new CliHandler();
    const result = handler.rotateTable("./fixtures/input.csv");
    assert.deepEqual(result, true);
  });
});
