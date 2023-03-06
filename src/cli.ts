import { program } from "commander";
import { CliHandler } from "./cli/cli-handler";

program.argument("<filePath>", "file path").action((filePath) => {
  const handler = new CliHandler();
  handler.readFile(filePath);
});

program.parse();
