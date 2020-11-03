module.exports = [
  // Add support for native node modules
  {
    test: /\.node$/,
    use: 'node-loader',
  },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@marshallofsound/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|\.webpack)/,
    use: {
      loader: 'ts-loader',
      options: {
        transpileOnly: true
      }
    },
  },{
    test: /\.(jpe?g|png|gif|ico)$/,
    use: [{ loader: 'file-loader?name=img/[name]__[hash:base64:5].[ext]' }]
  },
  {
    test: /\.(eot|svg|ttf|woff|woff2)$/,
    use: [{ loader: 'file-loader?name=font/[name]__[hash:base64:5].[ext]' }]
  }
]
