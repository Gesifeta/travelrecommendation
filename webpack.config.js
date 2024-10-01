const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      title: "Fresh Fruit Marketplace",
      metaDesc:
        "Find the freshest and highest quality fruits from local and global sources at our fruit marketplace. Shop for a variety of seasonal and exotic fruits today!",
      header: "Fruit Marketplace",
      template: "./src/index.html",
      filename: "index.html",
      inject: "body",
    }),
  ],
  mode: "development",
  output: {
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(jpg)$/i,
        type: "asset/resource",
        generator: {
          outputPath: "images/",
          publicPath: "images/",
          filename: "[name][ext]",
        },
      },
      {
        test: /\.(css)$/i,
        type: "asset/resource",
        generator: {
          outputPath: "css/",
          publicPath: "css/",
          filename: "[name][ext]",
        },
      },
    ],
  },
};