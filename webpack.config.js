const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.ts",
  target: "node",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: ["/node_modules/", "/src/multi/"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};
