'use strict';

const path = require('path')
const merge = require('webpack-merge')

const Webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const BaseConfig = require('./webpack.base.js')

module.exports = merge(BaseConfig, {
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, 'public')
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    hot: true
  },
  plugins: [
    new CleanWebpackPlugin(['public']),
    // new BundleAnalyzerPlugin(),
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.NamedModulesPlugin(),
  ]
});