import httpProxy from 'http-proxy';
const proxy = httpProxy.createProxyServer({});

const leastConnections = async (serverHeap, heapMutex, req, res) => {
  let target;
  await heapMutex.runExclusive(async () => {
    target = await serverHeap.extract();
    target.connections++;
    await serverHeap.insert(target);
  });

  console.log('receives request', target, ' heap:', serverHeap.toArray());

  proxy.web(req, res, { target: `http://${target.host}:${target.port}` }, (err) => {
    if (err) {
      console.error(`Error proxying request to ${target.host}:${target.port}:`, err);
      res.statusCode = 500;
      res.end('Proxy error');
    }
  });

  res.on('finish', async () => {
    await heapMutex.runExclusive(async () => {
      serverHeap.remove(target);
      target.connections--;
      serverHeap.insert(target);
    });
    
    console.log('finish', target);
  });
}

export default leastConnections;