const http = require('http');
const app = require('./index').app; // Import your Koa app instance

module.exports = async function globalSetup() {
  const server = http.createServer(app.callback());
  await new Promise((resolve, reject) => {
    server.listen(0, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};