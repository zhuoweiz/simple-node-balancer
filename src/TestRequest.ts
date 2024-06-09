import axios from 'axios';

const REQUESTS = 1000;
const URL = 'http://localhost:3000';

async function sendRequests() {
  const requests = [];
  for (let i = 1; i <= REQUESTS; i++) {
    requests.push(axios.get(URL));
  }
  await Promise.all(requests);
  console.log('All requests are done!');
}

sendRequests().catch(console.error);