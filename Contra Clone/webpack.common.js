/* eslint-disable */

const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './index.js',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      // title: 'Production',
      template: './index.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: '../assets', to: '../dist/assets' },
      ],
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      // {
      //   test: /\.(jpg|png|svg)$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: '[name].[ext]',
      //         publicPath: 'assets/images/',
      //       },
      //     },
      //   ],
      // },
      // {
      //   test: /\.(ttf|woff|woff2|eot|ico)$/,
      //   use: 'file-loader',
      // },
      {
        test: /\.(mp3|wav)$/,
        use: 'file-loader',
      },
      // {
      //   test: /\.css$/,
      //   use: cssLoaders(),
      // },
      // {
      //   test: /\.s[ac]ss$/,
      //   use: cssLoaders('sass-loader'),
      // },
    ],
  },
};