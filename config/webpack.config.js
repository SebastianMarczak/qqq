const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.js",
  },
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "../", "build"),
  },
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: "raw-loader",
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.sass|scss$/,
        use: ['style-loader', "css-loader", "sass-loader"],
      },
      {
        test: /\.jpg|png|svg|gif|jpeg$/,
        loader: 'file-loader',
      },
      {
        test: /\.js|jsx$/,
        loader: "babel-loader",
        exclude: /node_module/,
        options: {
          presets: [
              ["@babel/preset-env", {useBuiltIns: 'usage', corejs: "2.0.0"}],
              "@babel/preset-react"
          ],
          plugins: [
              "@babel/plugin-proposal-class-properties"
          ]
        }
      }
    ],
  },
  devServer: {
    open: true,
    static: {
      directory: path.resolve(__dirname, "../", "public"),
    },
    port: 5001, // domyślnie jest 8080
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "nowa aplikacja",
      template: "./template.html",
    }),
    new CopyPlugin({
      patterns: [
        { from: "public", to: "public" }
      ],
    })
  ],
};
