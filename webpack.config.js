const path = require("path");

const isProd = process.env.NODE_ENV === "prod";

module.exports = {
  mode: isProd ? "production" : "development",
  target: "node18",
  entry: {
    cli: "./src/cli.ts",
  },
  node: {
    __dirname: true,
  },
  resolve: {
    extensions: [".js", ".ts", "json"],
  },
  optimization: {
    minimize: isProd,
  },
  output: {
    libraryTarget: "commonjs",
    path: path.join(__dirname, ""),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: isProd,
            },
          },
        ],
      },
    ],
  },
};
