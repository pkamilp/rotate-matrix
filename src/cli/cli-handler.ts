import { CsvFormatterStream } from "fast-csv";
import { CsvReader } from "../csv/csv-reader";
import { InvalidInputError } from "../errors/invalid-input.error";
import { CsvWriter } from "../csv/csv-writer";
import { csvReaderOptions, csvWriterOptions } from "../csv/config/config";
import { MatrixRotate } from "../matrix/matrix-rotate";

interface InputRow {
  id: string;
  json: string;
}

interface OutputRow {
  id: string;
  json: string;
  is_valid: boolean;
}

export class CliHandler {
  private writeStream: CsvFormatterStream<InputRow, OutputRow>;
  private rotator: MatrixRotate;

  constructor() {
    this.writeStream = new CsvWriter().createStream(csvWriterOptions);
    this.rotator = new MatrixRotate();
  }

  rotateTable(input: string, output: NodeJS.WritableStream = process.stdout) {
    const readStream = new CsvReader().createStream(input, csvReaderOptions);

    this.writeStream.pipe(output);

    readStream.on("data", (data) => this.onInputStreamData(data));
    readStream.on("end", () => this.onInputStreamEnd());

    return true;
  }

  private onInputStreamData(data: Record<string, string>) {
    if (!("id" in data) || !("json" in data)) {
      throw new InvalidInputError("Invalid input data " + JSON.stringify(data));
    }

    const result = this.rotator.rotate(JSON.parse(data.json));

    this.writeStream.write({ id: data.id, json: JSON.stringify(result.rotated), is_valid: result.isValid });
  }

  private onInputStreamEnd() {
    this.writeStream.end();
  }
}
