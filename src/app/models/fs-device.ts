import { IFSNode, FSNode } from './fs-node';
import { IFolderProps, FolderProps } from './folder-props';
import { IDeviceProps, DeviceProps } from './device-props';

interface IFSDevice {
  node: IFSNode;
  folder: IFolderProps;
  device: IDeviceProps;
}

class FSDevice implements IFSDevice {
  node: FSNode;
  folder: FolderProps;
  device: DeviceProps;

  constructor({ node, folder, device }: IFSDevice) {
    this.node = new FSNode(node);
    this.folder = new FolderProps(folder);
    this.device = new DeviceProps(device);
  }
}

export { IFSDevice, FSDevice };
