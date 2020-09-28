const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const getComponents = require('./getComponents');
const entrys = getComponents(path.join(__dirname, './packages'));

module.exports = {
  entry: entrys,
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'lib'),
    filename: '[name].js',
    library: 'lib',
    libraryTarget: 'umd',
  },
  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      cacheGroups: {
        // Extracting all CSS/less in a single file
        styles: {
          name: 'styles',
          test: /\.(c|le)ss$/,
          chunks: 'all',
          enforce: true,
        },
      }
    },
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'theme-chalk/[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
  ]
}