'use strict';

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
    entry: {
      vendor:[
        'react', 'react-dom'
      ],
      index:'./src/index.js',
    },
    module: {
      loaders: [
          {test: /\.js$/, loader:'babel-loader', exclude:/node-modules/},
          { test: /\.css$/, loader: 'style-loader!css-loader' },
          { 
            test:/\.(png|svg|jpe?g|gif)$/i, 
            loaders:[
                'url-loader?limit=10000',
                'image-webpack-loader?{mozjpeg:{progressive:true}, gifsicle:{interlaced: false}, pngquant:{quality: "65-90", speed: 4}}',
            ]
          }
      ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          title: 'Webpack-template',
          filename: 'index.html',
          chunks:['vendor', 'common', 'manifest', 'index'],
          template: './template/index.ejs'
        }),
        new webpack.optimize.CommonsChunkPlugin({
          names:['vendor']
        }),
        new webpack.optimize.CommonsChunkPlugin({
          names:['common', 'manifest']
        })
    ]
  };
  
  module.exports = config;