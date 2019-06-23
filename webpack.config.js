const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = () => ({
  entry: {
    app: './src/index.js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
      filename: './index.html',
      title: 'Output Management',
    }),
    new webpack.ProvidePlugin({ 'window.decomp': 'poly-decomp' }),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'gyronorm',
          entry: 'gyronorm.complete.min.js',
        },
        {
          module: 'decomp',
          entry: 'decomp.js',
        },
        {
          module: 'pathseg',
          entry: 'pathseg.js',
        },
      ],
      cwpOptions: {
        context: path.resolve(__dirname, 'vendor'),
      },
    }),
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, 'src/assets/bmpFonts'), to: 'assets/bmpFonts' },
      { from: path.resolve(__dirname, 'src/assets/sheets'), to: 'assets/sheets' },
    ]),
  ],
  stats: 'normal',
  devServer: {
    disableHostCheck: true,
    stats: {
      modules: false,
    },
  },
  output: {
    filename: '[name][contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              formatter: require('eslint/lib/cli-engine/formatters/stylish')
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/fonts/',
            },
          },
        ],
      },
    ],
  },

  resolve: {
    alias: {
      app: path.resolve(__dirname, 'src/app'),
      assets: path.resolve(__dirname, 'src/assets'),
      utils: path.resolve(__dirname, 'src/utils'),
      pixiUtils: path.resolve(__dirname, 'src/pixiUtils'),
      TweenLite: 'gsap',
    },
  },

});
