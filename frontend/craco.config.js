module.exports = {
  devServer: {
    allowedHosts: "all", // Allow all hosts
    setupMiddlewares: (middlewares, devServer) => {
      // Custom middleware logic here
      return middlewares;
    },
  },
};
