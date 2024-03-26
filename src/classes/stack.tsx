interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  getSize: () => number;
  getAll: () => T[];
  clear: () => void;
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  }

  pop = (): void => {
    this.container.length !== 0 && this.container.pop()
  }

  peak = (): T | null => this.container.length !== 0 ? this.container[this.container.length - 1] : null

  getSize = (): number => this.container.length

  getAll = (): T[] => {
    const arr = [];
    for (let i = 0; i < this.container.length; i++) {
      arr.push(this.container[i]);
    }
    return arr;
  }

  clear = (): void => {
    this.container = [];
  }
}