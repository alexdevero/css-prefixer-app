const path = require('path')

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  new MonacoWebpackPlugin(),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, 'src', 'images'),
        to: path.resolve(__dirname, '.webpack/main', 'images')
      }
    ]
  })
]
