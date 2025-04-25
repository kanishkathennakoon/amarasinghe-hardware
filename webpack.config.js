const path = require("path");

module.exports = {
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"), // Ensure this path is correct
    },
    compress: true,
    port: 3000, // Specify the port you want to use
    open: true, // Automatically open the browser
    hot: true, // Enable Hot Module Replacement
    allowedHosts: ["all"], // Use 'all' to allow all hosts or specify an array of allowed hosts
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error("webpack-dev-server is not defined");
      }

      return middlewares;
    },
  },
  resolve: {
    fallback: {
      util: require.resolve("util/"),
      os: require.resolve("os-browserify/browser"),
      path: require.resolve("path-browserify"), // Added fallback for 'path'
      fs: false, // Explicitly set 'fs' to false if not needed in the browser
    },
  },
};
