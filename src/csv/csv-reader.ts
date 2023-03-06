import csv, { ParserOptions } from "csv-stream";
import * as fs from "fs";

export class CsvReader {
  stream(
    filePath: string,
    config: ParserOptions = {
      endLine: "\n",
      // eslint-disable-next-line @typescript-eslint/quotes
      escapeChar: '"',
      // eslint-disable-next-line @typescript-eslint/quotes
      enclosedChar: '"',
    },
  ): NodeJS.WritableStream {
    const csvStream = csv.createStream(config);

    return fs.createReadStream(filePath).pipe(csvStream);
  }
}
