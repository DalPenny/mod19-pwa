const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },

    //Add and configure workbox plugins for a service worker and manifest file.

    plugins: [
      //webpack plugin to generate html file and injects the bundle
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Just Another JATE Text Editor',
      }),
      // new MiniCssExtractPlugin(),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js'
      }),
      
      // new WorkboxPlugin.GenerateSW()

      //unit 28-creates manifest json
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'JATE Text Editor',
        short_name: 'JATE',
        description: 'Never lose your notes again!',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),

    ],

    module: {
      rules: [
        {
   //Add CSS loaders and babel to webpack.
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        // babel setup
        {
          test: /\.m?js$/,
          exclude: /node_modules|bower_components/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
        
      ],
    },
  };
};
