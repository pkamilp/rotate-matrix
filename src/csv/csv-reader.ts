import * as fs from "fs";
import csv, { ParserOptions } from "csv-stream";

export class CsvReader {
  createStream(filePath: string, config: ParserOptions): NodeJS.WritableStream {
    const csvStream = csv.createStream(config);

    return fs.createReadStream(filePath).pipe(csvStream);
  }
}