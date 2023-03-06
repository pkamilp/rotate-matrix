import { CsvReader } from "../csv/csv-reader";

export class CliHandler {
  readFile(filePath: string) {
    const reader = new CsvReader();
    const stream = reader.stream(filePath);

    stream.on("data", this.handleOnData);
    stream.on("error", this.handleOnError);

    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private handleOnData(data: { id: string; json: string }) {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private handleOnError(error: any) {}
}
