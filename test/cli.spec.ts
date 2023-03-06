import assert from "assert";
import { CliHandler } from "../src/cli/cli-handler";

describe("CLI Handler", () => {
  it("properly reads file", () => {
    const handler = new CliHandler();
    const result = handler.readFile("./src/csv/fixtures/input.csv");
    assert.deepEqual(result, true);
  });
});
