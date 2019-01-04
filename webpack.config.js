const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    app: './src/app.js'
  },
  output: {
    publicPath: __dirname + '/dist/',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js'
  },
  module: {
    rules: [
      // {
      //   test:/\.js$/,
      //   exclude:/(node_modules)/,
      //   use:{
      //     loader:"babel-loader"
      //   }
      // },
      {
        test: /\.scss$/, // 针对CSS结尾的文件设置LOADER
        use: ExtractTextPlugin.extract({
          fallback: {
            loader: 'style-loader'
          },
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            {
              loader: 'sass-loader' // 将 Sass 编译成 CSS
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].min.css',
      allChunks: false // 注意 2
    })
  ]
}
