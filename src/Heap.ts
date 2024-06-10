class Heap<T> {
  private heap: T[];
  private comparator: (a: T, b: T) => number;

  constructor(comparator: (a: T, b: T) => number) {
    this.heap = [];
    this.comparator = comparator;
  }

  public size(): number {
    return this.heap.length;
  }

  public toArray(): T[] {
    return this.heap.slice();
  }

  private getParentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  private getLeftChildIndex(index: number): number {
    return 2 * index + 1;
  }

  private getRightChildIndex(index: number): number {
    return 2 * index + 2;
  }

  private swap(index1: number, index2: number): void {
    [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
  }

  public insert(value: T): void {
    this.heap.push(value);
    this.heapifyUp();
  }

  private heapifyUp(): void {
    let index = this.heap.length - 1;
    while (index > 0) {
      const parentIndex = this.getParentIndex(index);
      if (this.comparator(this.heap[index], this.heap[parentIndex]) < 0) {
        this.swap(index, parentIndex);
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  public extract(): T | null {
    if (this.heap.length === 0) {
      return null;
    }
    if (this.heap.length === 1) {
      return this.heap.pop()!;
    }
    const top = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.heapifyDown();
    return top;
  }

  private heapifyDown(): void {
    let index = 0;
    while (this.getLeftChildIndex(index) < this.heap.length) {
      const leftChildIndex = this.getLeftChildIndex(index);
      const rightChildIndex = this.getRightChildIndex(index);
      let nextIndex = leftChildIndex;

      if (rightChildIndex < this.heap.length && this.comparator(this.heap[rightChildIndex], this.heap[leftChildIndex]) < 0) {
        nextIndex = rightChildIndex;
      }

      if (this.comparator(this.heap[nextIndex], this.heap[index]) < 0) {
        this.swap(index, nextIndex);
        index = nextIndex;
      } else {
        break;
      }
    }
  }

  public remove(value: T): boolean {
    const index = this.heap.indexOf(value);
    if (index === -1) {
      return false;
    }
    const last = this.heap.pop();
    if (index === this.heap.length) {
      return true;
    }
    this.heap[index] = last!;
    this.heapifyUp();
    this.heapifyDown();
    return true;
  }
}

export default Heap;