import { TitleBarComponent } from './../components/title-bar/title-bar.component';
import { FSDevice } from './fs-device';
import { FSFile } from './fs-file';
import { FSFileBuilder } from './fs-file-builder';
import { FSFolder } from './fs-folder';
import { Stack } from './stack';
import { FSFolderBuilder } from './fs-folder-builder';

type FSObjects = FSFile | FSFolder | FSDevice;
type FSItems = FSFile | FSFolder;
type FSParentObjects = FSDevice | FSFolder;
type FSJson = { [key: string]: any }[];
type FSBuilders = FSFolderBuilder | FSFileBuilder;

interface IFSFileSystem {
  buildFSFromJson(currentFolder: FSJson, parentObject: FSParentObjects): void;
  print(current: FSObjects[], offset: number): void;

  getDevices(): FSDevice[];
  getNode(name: string, currentFolder: FSParentObjects): FSItems | undefined;
  getNodeFromPath(path: string, device: FSDevice): any;
  getPath(node: FSObjects): string;
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

class FSFileSystem implements IFSFileSystem {
  devices: FSDevice[];

  constructor(devices: FSDevice[]) {
    this.devices = devices;
  }

  getDevices() {
    return this.devices;
  }

  // TODO - REFACTOR THIS KURWA GÓWNO PIERDOLONE XD
  buildFSFromJson(currentFolder: FSJson, parentObject: FSParentObjects) {
    currentFolder.forEach((item) => {
      let newObject: FSObjects;
      let builder: FSBuilders;

      if (item.type === 'folder' && 'children' in item) {
        builder = new FSFolderBuilder(item.name, parentObject);

        if ('isSystem' in item) {
          builder.setIsSystem(item.isSystem);
        }
      } else if (item.type === 'file') {
        builder = new FSFileBuilder(item.name, parentObject);

        if ('extension' in item) {
          builder.setExtension(item.extension);
        }
      } else {
        throw Error('Unknown object type - file system mount failed');
      }

      newObject = builder.build();
      parentObject.folder.children.push(newObject);

      if (newObject instanceof FSFolder || newObject instanceof FSDevice) {
        this.buildFSFromJson(item.children, newObject);
      }
    });
  }

  print(current: FSObjects[], offset: number) {
    const level = offset;

    current.forEach((item) => {
      let str = '';
      for (let i = 0; i < level; i++) {
        str += '\t';
      }

      console.log(`${str} ${item.toString()}`);

      if (item instanceof FSFolder && item.folder.children.length) {
        this.print(item.folder.children, ++offset);
      }
    });
  }

  getNode(name: string, currentFolder: FSParentObjects) {
    // Iterative search using Stack
    const stack = new Stack<FSParentObjects>();
    // Push root folder | device on stack
    stack.push(currentFolder);

    while (!stack.isEmpty()) {
      // Get element in which we will look for target node
      const currentItem = stack.pop();
      const itemElements = currentItem?.folder.children;

      /**
       * JEBAĆ CIE TS W DUPE KURWA SPRAWDZILEM WYZEJ CZY
       * STACK NIE JEST PUSTY TO CHUJ KURWA .POP NIE UMIE OGARNAC,
       * NAUCZ SIE KOMPILOWAĆ ŚMIECIU PIERDOLONY
       */
      if (itemElements) {
        for (const element of itemElements) {
          // If element is found
          if (this.compareItemNames(name, element.node.name)) {
            return element;
          }

          // If element is folder, push it on stack for further search
          if (element instanceof FSFolder) {
            stack.push(element);
          }
        }
      }
    }

    return;
  }

  // TODO - Refactor to search through all disks
  getNodeFromPath(path: string, device: FSDevice) {
    // Windows path regex
    if (
      !/^(?:[a-z]:)[\/\\](?:[.\/\\ ](?![.\/\\\n])|[^<>:"|?*.\/\\ \n])*$/i.test(
        path
      )
    ) {
      return;
    }

    // Replaces '/' with '\' and returns array of elements from path
    const arr = path.replace(/\//g, '\\').split('\\');
    // Always present due to regex
    const diskLetter = arr[0];

    // Check if disk letter matches with path
    if (device.device.letter !== diskLetter) {
      return;
    }

    // Set starting element as our disk
    let current: FSParentObjects = device;

    // Iterate over array of names
    for (let i = 1; i < arr.length; i++) {
      // Get index of next element in arr in current folder
      const index = this.getItemIndexFromFolder(arr[i], current);

      // Return if element doesn't exist
      if (index < 0) return;

      // Set to variable object found by name
      const foundNode: FSItems = current.folder.children[index];

      // If it's last element in array and exists, return it
      if (i === arr.length - 1) {
        return foundNode;
      }

      // TS KURWO ZBEDNE IFY MUSZE DAWAC ;-;
      // FSFILE ZAWSZE JEST LISCIEM NIE MA CHUJA
      // ZE BEDZIE INACZEJ KURWA !!!!!!!!!!!!!!!!!!!!!!!!
      // XD
      // If element exists but it isn't last iteration, continue
      if (foundNode instanceof FSFolder) {
        current = foundNode;
      } else {
        // Impossible case btw due to FSFileSystem nodes relations
        return;
      }
    }

    // Smth went wrong idk
    // Probably also impossible case
    return;
  }

  isItemInFolder(name: string, target: FSParentObjects) {
    // Check if there is item with the same name in target folder
    for (const item of target.folder.children) {
      if (this.compareItemNames(name, item.node.name)) {
        return true;
      }
    }

    return false;
  }

  getItemIndexFromFolder(name: string, target: FSParentObjects) {
    for (let i = 0; i < target.folder.children.length; i++) {
      if (this.compareItemNames(name, target.folder.children[i].node.name)) {
        return i;
      }
    }

    return -1;
  }

  insertNode(node: FSItems, target: FSParentObjects) {
    // Check if node with the same name exists in target folder
    if (this.isItemInFolder(node.node.name, target)) {
      return false;
    }

    // Add node to target folder
    target.folder.children.push(node);
    return true;
  }

  removeNode(node: FSItems, target: FSParentObjects) {
    // TODO - check system files in subdirectories

    // Check if target node isn't system folder
    if (node instanceof FSFolder && node.folder.isSystem) {
      return false;
    }

    // Remove from folder and reassign new items list
    target.folder.children = target.folder.children.filter(
      (item) => !this.compareItemNames(item.node.name, node.node.name)
    );

    return true;
  }

  // TODO - Refactor, moveNode almost the same
  copyNode(node: FSItems, target: FSParentObjects) {
    // Does element exist in target folder
    if (this.isItemInFolder(node.node.name, target)) {
      return false;
    }

    // Node may have null parent, only in disk case
    if (!node.node.parent) {
      return false;
    }

    const index = this.getNodeIndex(node);

    // If somehow given node is not its folder
    if (index < 0) {
      return false;
    }

    // Set new parent to node and add node to target folder
    node.node.parent = target;
    target.folder.children.push(node);

    return true;
  }

  // TODO - Refactor, copyNode almost the same
  moveNode(node: FSItems, target: FSParentObjects) {
    // Does element exist in target folder
    if (this.isItemInFolder(node.node.name, target)) {
      return false;
    }

    // Node may have null parent, only in disk case
    if (!node.node.parent) {
      return false;
    }

    const index = this.getNodeIndex(node);

    // If somehow given node is not its folder
    if (index < 0) {
      return false;
    }

    // Set new parent to node and add node to target folder
    node.node.parent = target;
    target.folder.children.push(node);

    // Remove node from parent children
    node.node.parent.folder.children.splice(index, 1);

    return true;
  }

  renameNode(node: FSItems, newName: string) {
    /**
     * Check if parent isn't null.
     * Check if there isn't item with the same name in current folder
     * */
    if (node.node.parent && !this.isItemInFolder(newName, node.node.parent)) {
      node.node.name = newName;
    }
  }

  getNodeIndex(node: FSItems) {
    // Find index of node in current folder
    const index =
      node.node.parent &&
      node.node.parent.folder.children.findIndex((item) =>
        this.compareItemNames(item.node.name, node.node.name)
      );

    // Return index if present or -1 if its not in parent folder
    return index ? index : -1;
  }

  changeExtension(node: FSFile, newExtension: string) {
    node.file.extension = newExtension;
  }

  compareItemNames(name1: string, name2: string) {
    return name1.toLowerCase() === name2.toLowerCase();
  }

  getPath(node: FSObjects) {
    let path: string[] = [];
    let currentNode = node;

    // iterate over parents until disk is reached
    while (currentNode.node.parent != null) {
      currentNode instanceof FSFile
        ? path.unshift(`${currentNode.node.name}.${currentNode.file.extension}`)
        : path.unshift(currentNode.node.name);

      currentNode = currentNode.node.parent;
    }

    // finally add disk letter to path
    if (currentNode instanceof FSDevice) {
      path.unshift(currentNode.device.letter);
    }

    // return string
    return path.join('\\');
  }
}

export { IFSFileSystem, FSFileSystem };
