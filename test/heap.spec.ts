import { expect } from 'chai';
import Heap from '../src/Heap';

describe('Heap', () => {
  let minHeap: Heap<{ value: number, connections: number }>;

  beforeEach(() => {
    minHeap = new Heap((a, b) => a.connections - b.connections);
  });

  it('should insert elements and maintain heap property', () => {
    minHeap.insert({ value: 1, connections: 5 });
    minHeap.insert({ value: 2, connections: 3 });
    minHeap.insert({ value: 3, connections: 8 });

    expect(minHeap.extract()).to.deep.equal({ value: 2, connections: 3 });
    expect(minHeap.extract()).to.deep.equal({ value: 1, connections: 5 });
    expect(minHeap.extract()).to.deep.equal({ value: 3, connections: 8 });
  });

  it('should remove elements and maintain heap property', () => {
    const server1 = { value: 1, connections: 5 };
    const server2 = { value: 2, connections: 3 };
    const server3 = { value: 3, connections: 8 };

    minHeap.insert(server1);
    minHeap.insert(server2);
    minHeap.insert(server3);

    minHeap.remove(server2);

    expect(minHeap.extract()).to.deep.equal(server1);
    expect(minHeap.extract()).to.deep.equal(server3);
  });

  it('should handle updating connections correctly', () => {
    const server1 = { value: 1, connections: 5 };
    const server2 = { value: 2, connections: 3 };
    const server3 = { value: 3, connections: 8 };

    minHeap.insert(server1);
    minHeap.insert(server2);
    minHeap.insert(server3);

    server2.connections = 10;
    minHeap.remove(server2);
    minHeap.insert(server2);

    expect(minHeap.extract()).to.deep.equal(server1);
    expect(minHeap.extract()).to.deep.equal(server3);
    expect(minHeap.extract()).to.deep.equal(server2);
  });
});
