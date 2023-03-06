import { CsvFormatterStream } from "fast-csv";
import { CsvReader } from "../csv/csv-reader";
import { InvalidInputError } from "../errors/invalid-input.error";
import { CsvWriter } from "../csv/csv-writer";
import { csvReaderOptions, csvWriterOptions } from "../csv/config/config";

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
  private writeStream!: CsvFormatterStream<InputRow, OutputRow>;

  rotateTable(filePath: string) {
    const reader = new CsvReader();
    const stream = reader.createStream(filePath, csvReaderOptions);

    const writer = new CsvWriter();
    this.writeStream = writer.createStream(csvWriterOptions);

    stream.on("data", (data) => this.handleOnData(data));
    stream.on("error", (error) => this.handleOnError(error));
    stream.on("end", () => this.handleOnEnd());

    return true;
  }

  private handleOnData(data: Record<string, string>) {
    if (!("id" in data) || !("json" in data)) {
      throw new InvalidInputError("Invalid input data " + JSON.stringify(data));
    }

    const row = {
      id: data.id,
      data: JSON.parse(data.json),
    };

    this.writeData(row.id, row.data, true);
  }

  private handleOnError(error: unknown) {
    // TODO add log message
    this.handleOnEnd();
  }

  private handleOnEnd() {
    this.writeStream.end();
  }

  private writeData(id: string, data: number[], isValid: boolean) {
    this.writeStream.write({ id, json: data, is_valid: isValid });
  }
}
