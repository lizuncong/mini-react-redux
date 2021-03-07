const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-inline-source-map',
  entry: {
    main: path.resolve(__dirname, '../src/index.jsx'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: "[name].js",
    chunkFilename: "[name].chunk.js"
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
            path.resolve(__dirname, '../src'),
            path.resolve(__dirname, '../lib'),
        ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    corejs:  3 ,
                  },
                ],
                '@babel/preset-react',
              ],
            },
          },
        ],
      },
      {
        test: lessRegex,
        exclude: lessModuleRegex,
        use:  [
          'style-loader',
          {
            loader: require.resolve('css-loader'),
            options:  {
              importLoaders: 2,
              sourceMap: false,
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'less-loader',
            options: { sourceMap: true },
          }
        ],
        sideEffects: true,
      },
      {
        test: lessModuleRegex,
        use: [
          'style-loader',
          {
            loader: require.resolve('css-loader'),
            options:    {
              importLoaders: 2,
              sourceMap: false,
              modules: {
                localIdentName: '[path][name]__[local]',
              },
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'less-loader',
            options: { sourceMap: true },
          }
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      index: 'index.html',
      template: path.resolve(__dirname, '../template.html'),
    }),
  ],
  devServer: {
    host: '0.0.0.0',
    port: '8088',
    contentBase: path.resolve(__dirname, '../dist'),
    // hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    overlay: {
      errors: true,
    },
  }
}
