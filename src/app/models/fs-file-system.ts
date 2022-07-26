import { FSDevice } from './fs-device';
import { FSFile } from './fs-file';
import { FSJson, FSParentObjects, FSObjects, FSItems } from './types';

interface IFSFileSystem {
  buildFSFromJson(currentFolder: FSJson, parentObject: FSParentObjects): void;
  print(current: FSObjects[], offset: number): void;

  getDevices(): FSDevice[];
  getNode(name: string, currentFolder: FSParentObjects): FSItems | undefined;
  getNodeFromPath(path: string, device: FSDevice): any;
  getPathFromNode(node: FSObjects): string;
  getNodeIndex(node: FSItems): number;

  isItemInFolder(name: string, target: FSParentObjects): boolean;
  insertNode(node: FSItems, target: FSParentObjects): boolean;
  removeNode(node: FSItems, target: FSParentObjects): boolean;
  copyNode(node: FSItems, target: FSParentObjects): boolean;
  moveNode(node: FSItems, target: FSParentObjects): boolean;
  renameNode(node: FSItems, newName: string): void;
  changeExtension(node: FSFile, newExtension: string): void;

  compareItemNames(name1: string, name2: string): boolean;
}

class FSFileSystem {
  devices: FSDevice[];

  constructor(devices: FSDevice[]) {
    this.devices = devices;
  }
}

export { IFSFileSystem, FSFileSystem };
