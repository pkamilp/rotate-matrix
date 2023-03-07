import { CsvFormatterStream } from "fast-csv";
import { CsvReader } from "../csv/csv-reader";
import { InvalidCsvError } from "../error/invalid-csv.error";
import { InvalidJsonError } from "../error/invalid-json.error";
import { CsvWriter } from "../csv/csv-writer";
import { csvReaderOptions, csvWriterOptions } from "../csv/config/config";
import { MatrixRotate } from "../matrix/matrix-rotate";
import { RotateLeftStrategy } from "../matrix/strategy/rotate-left.strategy";

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
    this.rotator = new MatrixRotate(new RotateLeftStrategy());
  }

  rotateTable(input: string, output: NodeJS.WritableStream = process.stdout): boolean {
    const readStream = new CsvReader().createStream(input, csvReaderOptions);

    this.writeStream.pipe(output);

    readStream.on("data", (data) => this.onInputStreamData(data));
    readStream.on("end", () => this.onInputStreamEnd());

    return true;
  }

  private onInputStreamData(data: Record<string, string>): void {
    if (!("id" in data) || !("json" in data)) {
      throw new InvalidCsvError("Invalid input data " + JSON.stringify(data));
    }

    try {
      const parsedData = JSON.parse(data.json);
      const result = this.rotator.rotate(parsedData);

      this.writeStream.write({
        id: data.id,
        json: JSON.stringify(result.rotated).replaceAll(",", ", "),
        is_valid: result.isValid,
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      throw new InvalidJsonError(`Invalid json file provided - ${errorMessage}`);
    }
  }

  private onInputStreamEnd(): void {
    this.writeStream.end();
  }
}
