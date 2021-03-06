const path = require('path');

module.exports = {
  context: __dirname,
  entry: './entry.jsx',
  output: {
    path: path.resolve(__dirname, 'javascripts'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '*']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['@babel/env', '@babel/preset-react']
          }
        },
      }
    ]
  },
  devtool: 'source-map'
};
