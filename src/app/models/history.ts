import { Stack } from './stack';

// ! TODO - Refactor bo chuj wie czy to działa wgl X X X D
class ExplorerHistory extends Stack<string> {
  current: number = 0;

  constructor() {
    super();
  }

  override push(item: string) {
    if (this.current < this.items.length - 1) {
      // If we are not at the end of the stack, remove all items after the current one
      this.items.splice(this.current + 1, this.items.length - this.current - 1);
    }

    super.push(item);

    this.items.length === 1 ? (this.current = 0) : this.current++;

    return true;
  }

  hasPrevious() {
    return this.current > 0;
  }

  hasNext() {
    return this.current < this.items.length - 1;
  }

  setPrevious() {
    if (this.items.length > 0 && this.current > 0) this.current--;
  }

  setNext() {
    if (this.items.length > 0 && this.current < this.items.length - 1)
      this.current++;
  }

  setPosition(position: number) {
    if (
      this.items.length > 0 &&
      position >= 0 &&
      position < this.items.length
    ) {
      this.current = position;
    }
  }

  getCurrent() {
    if (this.items.length > 0) {
      return this.items[this.current];
    }
  }
}

export { ExplorerHistory };