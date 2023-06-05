const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './client/src/js/index.js',
      install: './client/src/js/install.js'
    },
    devServer: {
      contentBase: path.join(__dirname, 'client', 'dist'),
      compress: true,
      port: 8080,
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'client', 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './client/src/index.html',
        chunks: ['main'],
      }),
      new HtmlWebpackPlugin({
        template: './client/src/install.html',
        chunks: ['install'],
        filename: 'install.html',
      }),
      new WebpackPwaManifest({
        name: 'Text-Editor',
        background_color: '#ffffff',
        icons: [
          {
            src: path.resolve('client/src/images/icon.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            purpose: 'any maskable',
          },
        ],
      }),
      new InjectManifest({
        swSrc: './client/src/js/service-worker.js',
      }),
    ],

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    }
  };
};