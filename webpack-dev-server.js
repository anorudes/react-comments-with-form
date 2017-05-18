import Express from 'express';
import http from 'http';

const app = new Express();
const server = new http.Server(app);
const port = 3001;
const proxy = require('http-proxy').createProxyServer({});

global.ssr = true;

(function initWebpack() {
  const webpack = require('webpack');
  const webpackConfig = require('./webpack/common.config');
  const compiler = webpack(webpackConfig);

  // Proxy for static folder
  app.use(/\/static\/(.*)/, (req, res) => {
    req.url = req.originalUrl;
    proxy.web(req, res, { target: 'http://localhost:3000' });
  });

  app.use(require('webpack-dev-middleware')(compiler, {
    quiet: true,
    noInfo: true,
    cache: true,
    stats: {
      colors: true,
      timings: true,
      chunks: true,
      errors: true,
      errorDetails: true,
      warnings: true,
    },
    publicPath: webpackConfig.output.publicPath,
  }));

  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 1000,
  }));

}());

server.listen(port, () => {
  const host = server.address().address;

  console.log('Server is listening on http://%s:%s', host, port);
});
