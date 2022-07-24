import { IFSNode, FSNode } from './fs-node';
import { IItemProps, ItemProps } from './item-props';
import { IFileProps, FileProps } from './file-props';

interface IFSFile {
  node: IFSNode;
  item: IItemProps;
  file: IFileProps;
}

class FSFile implements IFSFile {
  node: FSNode;
  item: ItemProps;
  file: FileProps;

  constructor({ node, item, file }: IFSFile) {
    this.node = new FSNode(node);
    this.item = new ItemProps(item);
    this.file = new FileProps(file);
  }

  toString() {
    return `[FILE] ${this.node.name}.${this.file.extension}`;
  }
}

export { IFSFile, FSFile };
