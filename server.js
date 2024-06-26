import { createServer } from 'http';
import roundRobin from './roundRobin.mjs';
import leastConnections from './leastConnections.mjs';
import Heap from './dist/src/Heap.js';
import { Mutex } from 'async-mutex';

import serverConfig from './serverConfig.json' assert { type: 'json' };
const backendServers = serverConfig.servers;

const servers = backendServers.map(server => ({
  ...server,
  connections: 0
}));

// put servers in the heap
const serverHeap = new Heap((a, b) => a.connections - b.connections);
const heapMutex = new Mutex();

servers.forEach(server => {
  serverHeap.insert(server);
});

const loadBalancingAlgorithm = 'leastConnections';

const server = createServer(async (req, res) => {
  if (loadBalancingAlgorithm === 'roundRobin') {
    roundRobin(servers, req, res);
  } else if (loadBalancingAlgorithm === 'leastConnections') {
    await leastConnections(serverHeap, heapMutex, req, res);
  } else {
    res.writeHead(500);
    res.end('Load balancing algorithm not found');
  }
});

server.listen(3000, () => {
  console.log('Load balancer running at http://localhost:3000/');
});