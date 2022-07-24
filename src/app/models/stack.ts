class Stack<T> {
  items: T[];

  constructor() {
    this.items = [];
  }

  push(item: T) {
    this.items.push(item);
    return true;
  }

  pop() {
    return this.items.pop();
  }

  peek() {
    if (!this.isEmpty) {
      return this.items[this.items.length - 1];
    }
    return null;
  }

  clear() {
    this.items.length = 0;
  }

  getItems() {
    return this.items;
  }

  isEmpty() {
    return this.items.length === 0 ? true : false;
  }
}

export { Stack };
