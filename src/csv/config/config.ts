export const csvReaderOptions = {
  endLine: "\n",
  // eslint-disable-next-line @typescript-eslint/quotes
  escapeChar: '"',
  // eslint-disable-next-line @typescript-eslint/quotes
  enclosedChar: '"',
};

export const csvWriterOptions = {
  headers: true,
  escape: "\n",
  quoteHeaders: false,
  quoteColumns: [false, true, false],
};
