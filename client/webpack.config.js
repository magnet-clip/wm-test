const path = require("path");

module.exports = {
  mode: "production",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  entry: path.join(__dirname, "/src", "index.tsx"),
  module: {
    rules: [
      {
        test: /\.?((j|t)sx|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "../service/static"),
    filename: "index.min.js",
    // chunkFilename: "index.min.js",
  },
};
