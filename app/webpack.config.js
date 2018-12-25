const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

console.log('XXXXXXX', __dirname)
module.exports = {
  mode: 'production',
  entry: {
    main: './src/client/main.js',
    'service-worker': './src/client/service-worker.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public')
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader"
        ]
      }
    ]
  }
};