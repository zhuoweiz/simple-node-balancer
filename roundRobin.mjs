// const httpProxy = require('http-proxy');
import httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer();

let current = 0;

const roundRobin = (servers, req, res) => {
  const target = servers[current]
  console.log(target)
  current = (current + 1) % servers.length

  proxy.web(req, res, { target: `http://${target.host}:${target.port}` });
  console.log("sent ")
}

export default roundRobin;