import axios from 'axios';
import { performance } from 'perf_hooks';

const REQUESTS = 100;
const URL = 'http://localhost:3000';

async function sendRequests() {
  const requests = [];
  const startTime = performance.now();
  
  for (let i = 1; i <= REQUESTS; i++) {
    requests.push(axios.get(URL));
  }
  
  await Promise.all(requests);
  
  const endTime = performance.now();
  const duration = endTime - startTime;
  
  console.log('All requests are done!');
  console.log(`Time taken: ${(duration / 1000).toFixed(2)} seconds`);
}

sendRequests().catch(console.error);