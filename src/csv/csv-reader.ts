import { createReadStream } from "fs";
import csv, { ParserOptions } from "csv-stream";

export class CsvReader {
  createStream(filePath: string, config: ParserOptions): NodeJS.WritableStream {
    const csvStream = csv.createStream(config);

    return createReadStream(filePath).pipe(csvStream);
  }
}
