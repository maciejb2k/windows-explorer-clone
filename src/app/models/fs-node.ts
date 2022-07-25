import { FSDevice } from './fs-device';
import { FSFolder } from './fs-folder';

interface IFSNode {
  name: string;
  parent: FSDevice | FSFolder | null;
  icon?: number;
}

class FSNode implements IFSNode {
  name: string;
  parent: FSDevice | FSFolder | null;
  icon: number;

  constructor({ name = 'node', icon = 14, parent = null }: IFSNode) {
    this.name = name;
    this.icon = icon;
    this.parent = parent;
  }
}

export { IFSNode, FSNode };
