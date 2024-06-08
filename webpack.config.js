const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  mode: process.env.NODE_ENV,
  entry: '/src/index.js',

  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devServer: {
    port: 8080,
    proxy: {
      '/action': 'http://localhost:3000',
      '/auth': 'http://localhost:3000',
    },
    historyApiFallback: true,
    static: '/build',
    hot: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss'],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }],
              ['@babel/preset-react', { targets: 'defaults' }],
            ],
          },
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/images/[name].[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /(\.css|\.scss)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
};

module.exports = config;
