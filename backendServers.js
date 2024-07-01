import { createServer as _createServer } from 'http';
import serverConfig from './serverConfig.json' assert { type: 'json' };

const servers = serverConfig.servers;
const createServer = (host, port, timeout) => {
  _createServer((req, res) => {
    setTimeout(() => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(`Hello from ${host}:${port}!\n`);
    }, timeout);
  }).listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
  })
}

servers.forEach(server => {
  createServer(server.host, server.port, server.timeout);
});