import { FSDevice } from './fs-device';
import { FSFolder } from './fs-folder';

interface IFSNode {
  name: string;
  icon?: number;
  parent: FSDevice | FSFolder | null;
}

class FSNode implements IFSNode {
  name: string;
  icon?: number;
  parent: FSDevice | FSFolder | null;

  constructor({ name = 'node', icon = 14, parent = null }: IFSNode) {
    this.name = name;
    this.icon = icon;
    this.parent = parent;
  }
}

export { IFSNode, FSNode };
