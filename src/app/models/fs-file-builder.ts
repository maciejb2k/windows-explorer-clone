import { FSDevice } from './fs-device';
import { FSFile, IFSFile } from './fs-file';
import { FSFolder } from './fs-folder';

interface IFSFileBuilder {
  props: IFSFile;

  setIcon(icon: number): FSFileBuilder;
  setHidden(isHidden: boolean): FSFileBuilder;
  setReadonly(isReadonly: boolean): FSFileBuilder;
  setExtension(extension: string): FSFileBuilder;
  setData(extension: any): FSFileBuilder;
  build(): FSFile;
}

class FSFileBuilder implements IFSFileBuilder {
  props: IFSFile;

  constructor(name: string, parent: FSDevice | FSFolder) {
    this.props = {
      node: {
        name,
        parent,
      },
      item: {},
      file: {},
    };
  }

  setIcon(icon: number) {
    this.props.node.icon = icon;
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

  setExtension(extension: string) {
    this.props.file.extension = extension;
    return this;
  }

  setData(data: any) {
    this.props.file.data = data;
    return this;
  }

  build() {
    return new FSFile(this.props);
  }
}

export { IFSFileBuilder, FSFileBuilder };
