const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    stats: 'minimal',
    publicPath: '/',
    hot: true,
  },
};
