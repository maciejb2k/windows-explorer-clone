import { FSDevice } from './fs-device';
import { IFSFolder, FSFolder } from './fs-folder';

interface IFSFolderBuilder {
  props: IFSFolder;

  build(): IFSFolder;
}

class FSFolderBuilder implements IFSFolderBuilder {
  props: IFSFolder;

  constructor(name: string, parent: FSDevice | FSFolder) {
    this.props = {
      node: {
        name,
        parent,
      },
      item: {},
      folder: {},
    };
  }

  setIcon(icon: number) {
    this.props.node.icon = icon;
    return this;
  }

  setIsSystem(isSystem: boolean) {
    this.props.folder.isSystem = isSystem;
    return this;
  }

  setIsUserHome(isUserHome: boolean) {
    this.props.folder.isUserHome = isUserHome;
    return this;
  }

  setHidden(isHidden: boolean) {
    this.props.item.isHidden = isHidden;
    return this;
  }

  setReadonly(isReadonly: boolean) {
    this.props.item.isReadonly = isReadonly;
    return this;
  }

  build() {
    return new FSFolder(this.props);
  }
}

export { IFSFolderBuilder, FSFolderBuilder };
