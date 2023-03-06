import { CsvFormatterStream, format, FormatterOptionsArgs, FormatterRow } from "fast-csv";

export class CsvWriter<I extends FormatterRow, O extends FormatterRow> {
  createStream(config: FormatterOptionsArgs<I, O>): CsvFormatterStream<I, O> {
    return format(config);
  }
}
