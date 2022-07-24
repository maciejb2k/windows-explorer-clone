import { IFSNode, FSNode } from './fs-node';
import { IItemProps, ItemProps } from './item-props';
import { IFolderProps, FolderProps } from './folder-props';

interface IFSFolder {
  node: IFSNode;
  item: IItemProps;
  folder: IFolderProps;
}

class FSFolder implements IFSFolder {
  node: FSNode;
  item: ItemProps;
  folder: FolderProps;

  constructor({ node, item, folder }: IFSFolder) {
    this.node = new FSNode(node);
    this.item = new ItemProps(item);
    this.folder = new FolderProps(folder);
  }

  toString() {
    return `[FOLDER] ${this.node.name}`;
  }
}

export { IFSFolder, FSFolder };
