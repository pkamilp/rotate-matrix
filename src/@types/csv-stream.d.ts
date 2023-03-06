declare module "csv-stream" {
  export interface ParserOptions {
    delimiter?: string;
    endLine?: string;
    columns?: string[];
    columnOffset?: number;
    escapeChar?: string;
    enclosedChar?: string;
  }

  const Parser: {
    createStream(options?: ParserOptions): NodeJS.WritableStream;
  };

  export default Parser;
}
