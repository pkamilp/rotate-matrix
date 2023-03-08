import { CsvFormatterStream } from "fast-csv";
import { CsvReader } from "../csv/csv-reader";
import { InvalidCsvError } from "../error/invalid-csv.error";
import { InvalidJsonError } from "../error/invalid-json.error";
import { CsvWriter } from "../csv/csv-writer";
import { csvReaderOptions, csvWriterOptions } from "../csv/config/config";
import { MatrixRotationUseCase } from "./matrix-rotation.use-case";
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
  private readonly writeStream: CsvFormatterStream<InputRow, OutputRow>;
  private readonly rotator: MatrixRotationUseCase;

  constructor() {
    this.writeStream = new CsvWriter().createStream(csvWriterOptions);
    this.rotator = new MatrixRotationUseCase(new RotateLeftStrategy());
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

      if (error instanceof SyntaxError) {
        throw new InvalidJsonError(`Invalid json file provided - ${errorMessage}`);
      }

      throw error;
    }
  }

  private onInputStreamEnd(): void {
    this.writeStream.end();
  }
}
