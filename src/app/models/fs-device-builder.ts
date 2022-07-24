import { FSDevice } from './fs-device';
import { IFSFolder, FSFolder } from './fs-folder';

interface IFSDeviceBuilder {
  props: IFSFolder;

  build(): IFSFolder;
}

class FSDeviceBuilder implements IFSDeviceBuilder {
  props: IFSFolder;

  constructor(name: string) {
    this.props = {
      node: {
        name,
        parent: null,
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

export { IFSDeviceBuilder, FSDeviceBuilder };
