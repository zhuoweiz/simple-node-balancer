import httpProxy from 'http-proxy';
// var httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer({});

const updateConnections = (serverHeap, target, change) => {
  serverHeap.extract(target);
  target.connections += change;
  serverHeap.insert(target);
}

const leastConnections = (serverHeap, req, res) => {
  const target = serverHeap.extract();
  target.connections++;
  serverHeap.insert(target);
  console.log('receives request', target);

  proxy.web(req, res, { target: `http://${target.host}:${target.port}` }, (err) => {
    if (err) {
      console.error(`Error proxying request to ${target.host}:${target.port}:`, err);
      res.statusCode = 500;
      res.end('Proxy error');
    }
  });

  res.on('finish', () => {
    updateConnections(serverHeap, target, -1);
    console.log('finish', target);
  });

  res.on('close', () => {
    if (!res.finished) {
      updateConnections(serverHeap, target, -1);
      console.log('Request closed before finish:', target);
    }
  });
}

export default leastConnections;