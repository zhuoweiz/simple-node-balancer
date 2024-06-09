import axios from 'axios';

const REQUESTS = 10;
const URL = 'http://localhost:3000';

async function sendRequests() {
  const requests = [];
  for (let i = 1; i <= REQUESTS; i++) {
    requests.push(axios.get(URL));
  }
  await Promise.all(requests);
  console.log('All requests have been sent.');
}

sendRequests().catch(console.error);