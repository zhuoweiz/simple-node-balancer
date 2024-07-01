#!/bin/bash

REQUESTS=1000
URL="http://localhost:3000"

for ((i=1; i<=REQUESTS; i++)); do
  curl -s $URL &
  sleep 0.001
done

echo "Waiting for all requests to finish..."

wait

echo "All requests done."
