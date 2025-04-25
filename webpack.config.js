module.exports = {
  devServer: {
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
