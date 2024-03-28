export class Node<T> {
  value: T;
  next: Node<T> | null;

  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = (next !== undefined ? next : null);
  }
}

interface ILinkedList<T> {
  append: (element: T) => void;
  insertAt: (element: T, idx: number) => void;
  removeAt: (idx: number) => void;
  getSize: () => number;
  print: () => T[];
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private size: number;
  
  constructor() {
    this.head = null;
    this.size = 0;
  }

  append(element: T) {
    const node = new Node(element);
    let current;

    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;

      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }

    ++this.size
  };

  insertAt = (element: T, idx: number) => {
    if (idx < 0 || idx > this.size) {
      throw new Error('Enter a valid index');
    } else {
      const node = new Node(element);

      if (idx === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let current = this.head;
        let currentIdx = 0;

        while(currentIdx < idx - 1 && current !== null) {
          current = current.next;
          ++currentIdx;
        }

        if (current) {
          node.next = current.next;
          current.next = node;
        }

      }
      ++this.size
    }
  };

  removeAt = (idx: number) => {
    if (idx < 0 || idx > this.size) {
      throw new Error('Enter a valid index');
    } else {

      if (this.head) {
        if (idx === 0) {
          const temp = this.head;
          this.head = null;
          this.head = temp.next
        } else {
          let current = this.head;
          let currentIdx = 0;
  
          while(current.next) {
            if (currentIdx === idx - 1) {
              break
            } else {
              current = current.next;
              ++currentIdx;
            }
          }

          if (current.next) {
            const temp = current.next;
            current.next = null;
            current.next = temp.next
          }
        }

        --this.size
      }
    }
  };

  getSize = () => this.size;

  print = () => {
    let current = this.head;
    let res = [];

    while (current) {
      res.push(current.value);
      current = current.next
    }

    return res;
  }
}