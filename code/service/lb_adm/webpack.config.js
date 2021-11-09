
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = {
  devtool: false,
  output: {
    path: __dirname + "/dist",
    // filename:"[fullhash].js"
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
  target: 'node',
  module: {
    rules: [
      // Add support for native node modules
      {
        test: /\.node$/,
        use: 'node-loader',
      },
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       plugins: [
      //         "@babel/plugin-transform-runtime",
      //         "@babel/plugin-proposal-optional-chaining"
      //       ],
      //       presets: ["@babel/preset-env"],
      //       sourceType: 'unambiguous',
      //     }
      //   }
      // },
    ],
  },
};
