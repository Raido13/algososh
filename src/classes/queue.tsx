interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
  getSize: () => number;
  getHead: () => number;
  getTail: () => number;
  getAll: () => T[];
  clear: () => void;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head: number = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    } else {
      if (this.length > 0) ++this.tail;
      this.container[this.tail] = item;
      ++this.length;    
    }
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    } else {
      this.container[this.head] = null;
      if (this.length > 0 && this.head !== this.size-1 && this.head !== this.tail) ++this.head;
      --this.length; 
    }
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    } else {
      return this.container[this.head % this.size];
    }
  };

  getSize = () => this.length;

  getHead = () => this.head;

  getTail = () => this.tail;

  getAll = (): T[] => {
    const arr = [];
    for (let i = 0; i < this.size; i++) {
      arr.push(this.container[i])
    }
    return arr !== null ? arr : Array(this.size);
  }

  clear = () => {
    this.container = Array(this.size);
    this.length = 0;
    this.head = 0;
    this.tail = 0
  }

  isEmpty = () => this.length === 0;
}