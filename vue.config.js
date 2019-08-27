module.exports = {
  devServer: {
    clientLogLevel: 'info',
    proxy: {
      '^/api': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true,
      },
    },
  },
};