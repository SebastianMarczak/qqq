const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
  mode: "production",
  entry: {
    main: "./src/index.js",
  },
  output: {
    filename: "js/[name]-[contenthash:6]-bundle.js",
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
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.sass|scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.jpg|png|svg|gif|jpeg$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name]-[contenthash:6].[ext]",
              outputPath: "images"
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                quality: 50
              },
              webp:{
                quality: 50,
                progressive: false
              }
            },
          },
        ],
      },
      {
        test: /\.js|.jsx$/,
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
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "nowa aplikacja",
      template: "./template.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name]-[contenthash].css",
    }),
    new CopyPlugin({
      patterns: [
        { from: "public", to: "public" }
      ],
    })
  ],
};
