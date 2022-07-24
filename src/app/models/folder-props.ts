import { FSFolder } from './fs-folder';
import { FSFile } from './fs-file';

interface IFolderProps {
  children?: (FSFolder | FSFile)[];
  isSystem?: boolean;
  isLibrary?: boolean;
}

class FolderProps implements IFolderProps {
  children: (FSFolder | FSFile)[];
  isSystem: boolean;
  isLibrary: boolean;

  constructor({ isSystem = false, isLibrary = false }: IFolderProps) {
    this.children = [];
    this.isSystem = isSystem;
    this.isLibrary = isLibrary;
  }
}

export { IFolderProps, FolderProps };
