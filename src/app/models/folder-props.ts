import { FSFolder } from './fs-folder';
import { FSFile } from './fs-file';

// TODO - REFACTOR Z TYM ISUSERHOME ZEBY NIE BYLO W KAZDYM NODE

interface IFolderProps {
  children?: (FSFolder | FSFile)[];
  isSystem?: boolean;
  isUserHome?: boolean;
  isLibrary?: boolean;
}

class FolderProps implements IFolderProps {
  children: (FSFolder | FSFile)[];
  isSystem: boolean;
  isLibrary: boolean;
  isUserHome: boolean;

  constructor({
    isSystem = false,
    isLibrary = false,
    isUserHome = false,
  }: IFolderProps) {
    this.children = [];
    this.isSystem = isSystem;
    this.isLibrary = isLibrary;
    this.isUserHome = isUserHome;
  }
}

export { IFolderProps, FolderProps };
