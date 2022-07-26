import {
  QUICK_ACCESS,
  VIEW_THIS_PC,
  VIEW_QUICK_ACCESS,
  INIT_LOCATION,
} from './../common/views-constants';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FSDevice } from '../models/fs-device';
import { FSFile } from '../models/fs-file';
import { FSFileBuilder } from '../models/fs-file-builder';
import { FSFolder } from '../models/fs-folder';
import { FSFolderBuilder } from '../models/fs-folder-builder';
import {
  THIS_PC,
  LIBRARIES,
  RECYCLE_BIN,
} from 'src/app/common/views-constants';
import { initDevices, initFS } from '../models/fs-init';
import {
  FSDevices,
  FSJson,
  FSParentObjects,
  FSObjects,
  FSBuilders,
  FSItems,
  FSItemsView,
} from '../models/types';
import { ExplorerHistory } from '../models/history';

import { USER_HOME, SYSTEM_FOLDERS } from 'src/app/common/views-constants';

@Injectable({
  providedIn: 'root',
})
export class FileSystemService {
  private fs$: BehaviorSubject<FSDevices>;

  private path$: BehaviorSubject<string>;
  private pathUrl$: BehaviorSubject<{ label: string; path: string }[]>;
  private displayLocation$: BehaviorSubject<string>;
  private currentFolder$!: BehaviorSubject<FSDevice | FSFolder | undefined>;
  private history$: BehaviorSubject<ExplorerHistory>;
  private selectedItems$: BehaviorSubject<FSItems[]>;

  private quickAccessRefs$: BehaviorSubject<FSItemsView>;
  private thisPcRefs$: BehaviorSubject<FSItemsView>;
  private librariesRefs$: BehaviorSubject<FSItemsView>;

  public sysObjectsRefs: { [key: string]: FSParentObjects } = {};
  private osDevice!: FSDevice; // os disk always present;

  constructor() {
    this.fs$ = new BehaviorSubject(initDevices);

    this.path$ = new BehaviorSubject<string>('');
    this.pathUrl$ = new BehaviorSubject<{ label: string; path: string }[]>([]);
    this.displayLocation$ = new BehaviorSubject<string>('');
    this.currentFolder$ = new BehaviorSubject<FSDevice | FSFolder | undefined>(
      undefined
    );

    this.history$ = new BehaviorSubject<ExplorerHistory>(new ExplorerHistory());

    this.quickAccessRefs$ = new BehaviorSubject<FSItemsView>([]);
    this.thisPcRefs$ = new BehaviorSubject<FSItemsView>([]);
    this.librariesRefs$ = new BehaviorSubject<FSItemsView>([]);

    this.selectedItems$ = new BehaviorSubject<FSItems[]>([]);

    // Setup init location
    this.setNewPath(INIT_LOCATION);

    // Init file system structure on OS device
    this.initFileSystem();

    // Init special windows views (this pc, quick access) which aren't folders
    this.setupViews();
  }

  // Ta funkcja jest spierdolona u podstaw XD,
  // bo obiekty są referencyjne i chuj że zmienie coś w nim, jak i tak
  // emituje te same wartości do subskrybentów po zmianie
  // A podobno za używanie `.value` na BehaviorSubject'ach jest wpierdol.
  initFileSystem() {
    const fs = this.getFs();

    // Iterate over init devices and setup file structure
    Object.keys(fs).forEach((letter) => {
      // Init FS for current device
      this.buildFSFromJson(initFS[letter], fs[letter]);

      // Print fs structure
      console.log(
        "%cFile system mounted on '" + letter + "' device:",
        'font-weight: bold; font-size: 14px;'
      );
      console.log(fs[letter]);
      this.print(fs[letter].folder.children, 0);

      // Choose OS device
      if (initDevices[letter].device.isOs) {
        this.osDevice = initDevices[letter];
      }
    });

    // Emit the same values to subscribers, nothing changed, because
    // objects are referenced and not copied
    this.fs$.next(fs);
  }

  // TODO - REFACTOR THIS GÓWNO PIERDOLONE XDDDDDDDDDDDDDD
  buildFSFromJson(currentFolder: FSJson, parentObject: FSParentObjects) {
    currentFolder.forEach((item) => {
      let newObject: FSObjects;
      let builder: FSBuilders;

      if (item.type === 'folder' && 'children' in item) {
        builder = new FSFolderBuilder(item.name, parentObject);

        if ('isSystem' in item) {
          builder.setIsSystem(item.isSystem);

          if ('isUserHome' in item) {
            builder.setIsUserHome(item.isUserHome);
          }
        }
      } else if (item.type === 'file') {
        builder = new FSFileBuilder(item.name, parentObject);

        if ('extension' in item) {
          builder.setExtension(item.extension);
        }
      } else {
        throw Error('Unknown object type - file system mount failed');
      }

      builder.setIcon(item.icon ? item.icon : 7);
      newObject = builder.build();

      parentObject.folder.children.push(newObject);

      if (newObject instanceof FSFolder || newObject instanceof FSDevice) {
        this.buildFSFromJson(item.children, newObject);
        if (newObject.folder.isSystem) {
          this.setRefFromSystemObject(newObject);
        }
      }
    });
  }

  // Asssign references to system objects from FS
  // TODO! - What if object doesn't exist and we want to navigate to it?
  setRefFromSystemObject(item: FSParentObjects) {
    if (item.folder.isUserHome) {
      this.sysObjectsRefs[USER_HOME] = item;
      return;
    }

    SYSTEM_FOLDERS.forEach((folder) => {
      if (item.node.name === folder) {
        this.sysObjectsRefs[folder] = item;
      }
    });
  }

  setupThisPcView() {
    const setupView: FSItemsView = [
      {
        name: 'Folders',
        children: [],
      },
      {
        name: 'Devices and drives',
        children: [],
      },
    ];

    Object.keys(this.sysObjectsRefs).forEach((key) => {
      if (VIEW_THIS_PC.includes(key)) {
        setupView[0].children.push(this.sysObjectsRefs[key]);
      }
    });

    const devices = this.getFs();

    Object.keys(devices).forEach((key) => {
      setupView[1].children.push(devices[key]);
    });

    this.thisPcRefs$.next(setupView);
  }

  setupQuickAccessView() {
    const setupView: FSItemsView = [
      {
        name: 'Frequent Folders',
        children: [],
      },
    ];

    Object.keys(this.sysObjectsRefs).forEach((key) => {
      if (VIEW_QUICK_ACCESS.includes(key)) {
        setupView[0].children.push(this.sysObjectsRefs[key]);
      }
    });

    this.quickAccessRefs$.next(setupView);
  }

  setupLibrariesView() {}

  // TODO! - Refactor DRY, aby w subjectice trzymać FSFolderView
  setupViews() {
    this.setupThisPcView();
    this.setupQuickAccessView();
  }

  // Returns nodes from current folder
  listNodesFromPath() {
    // Pobieramy aktualny folder z ścieżki
    const node = this.getNodeFromPath(this.getPath());

    // W takim formacie przekazane są wszystkie dzieci folderu
    const setupNodes: FSItemsView = [
      {
        name: 'Files',
        children: [],
      },
    ];

    // Jeżeli node nie jest typu folder lub device to zwróć
    if (!(node instanceof FSDevice) && !(node instanceof FSFolder)) {
      return setupNodes;
    }

    // If folder is empty
    if (node.folder.children.length === 0) {
      return setupNodes;
    }

    // Uwaga bo to jest referencja do obiektu, nie kopia
    // na oryginalnym FS to sortuje, nie na wycinku, ktory chcialem sobie pobrac
    node.folder.children.sort((a, b) => a.node.name.localeCompare(b.node.name));

    // Przypisz dzieci do setupNodes.children
    setupNodes[0].children = node.folder.children;

    return setupNodes;
  }

  // Returns path from given node
  getPathFromNode(node: FSObjects) {
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

    // Add trailing slash to end of path
    let pathStr = path.join('\\');

    if (!(node instanceof FSFile)) {
      pathStr += '\\';
    }

    // return string
    return pathStr;
  }

  // Split path to array of strings
  splitPath(path: string) {
    if (
      !/^(?:[a-z]:)[\/\\](?:[.\/\\ ](?![\/\\\n])|[^<>:"|?*.\/\\ \n])*$/i.test(
        path
      )
    ) {
      return;
    }

    // Replaces '/' with '\' and returns array of elements from path
    return path
      .replace(/\//g, '\\')
      .split('\\')
      .filter((i) => i);
  }

  // TODO - Refactor to search through all disks
  // TODO - Trailling slash in path is not handled
  getNodeFromPath(path: string): FSObjects | undefined {
    // Split array to path
    const arr = this.splitPath(path);
    if (!arr) return;

    // Always present due to regex
    const diskLetter = arr[0];

    const fs = this.getFs();

    // Check if disk letter matches with path
    if (!Object.keys(fs).includes(diskLetter)) {
      return;
    }

    // Search through all disks
    for (const key in fs) {
      // Set starting element as our disk
      let current: FSParentObjects = fs[key];

      // If path contains only disk letter, return it
      if (arr.length === 1 && arr[0] === key) {
        return current;
      }

      // Iterate over array of names
      for (let i = 1; i < arr.length; i++) {
        // Get index of next element in arr in current folder
        const index = this.getItemIndexFromFolder(arr[i], current);

        // Return if element doesn't exist
        // TODO! - Tu się coś pierdoliło przedtem
        if (index < 0) break;

        // Set to variable object found by name
        const foundNode: FSItems = current.folder.children[index];

        // If it's last element in array and exists, return it
        if (i === arr.length - 1) {
          return foundNode;
        }

        // TS KURWO ZBEDNE IFY MUSZE DAWAC
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
    }

    // Smth went wrong idk
    // Probably also impossible case
    return;
  }

  getItemIndexFromFolder(name: string, target: FSParentObjects) {
    for (let i = 0; i < target.folder.children.length; i++) {
      if (this.compareItemNames(name, target.folder.children[i].node.name)) {
        return i;
      }
    }

    return -1;
  }

  // Prints file system structure to console
  print(current: FSObjects[], offset: number) {
    const level = offset;

    current.forEach((item) => {
      let str = '';
      for (let i = 0; i < level; i++) {
        str += '  ';
      }

      console.log(`%c${str}${this.getPathFromNode(item)}`, 'font-size: 10px;');

      if (item instanceof FSFolder && item.folder.children.length) {
        this.print(item.folder.children, ++offset);
      }
    });
  }

  // Sets path to parent folder if present
  moveUp() {
    const currentFolder = this.currentFolder$.value;

    if (currentFolder && currentFolder.node.parent) {
      console.log(this.getPathFromNode(currentFolder.node.parent));
      this.setNewPath(this.getPathFromNode(currentFolder.node.parent));
      return;
    }

    this.setNewPath(THIS_PC);
  }

  // TODO - Refactor
  moveBack() {
    const history = this.getHistory();
    history.setPrevious();
    const current = history.getCurrent();

    if (current) {
      this.setPath(current);
      this.history$.next(history);
      this.setCurrentFolder();
    }
  }

  canMoveBack() {
    const history = this.getHistory();
    return history.hasPrevious();
  }

  // TODO - Refactor
  moveForward() {
    const history = this.getHistory();
    history.setNext();
    const current = history.getCurrent();

    if (current) {
      this.setPath(current);
      this.history$.next(history);
      this.setCurrentFolder();
    }
  }

  canMoveForward() {
    const history = this.getHistory();
    return history.hasNext();
  }

  setHistory(value: string) {
    const history = this.getHistory();
    history.push(value);
    this.history$.next(history);
  }

  compareItemNames(name1: string, name2: string) {
    return name1.toLowerCase() === name2.toLowerCase();
  }

  openSystemObject(item: string) {
    const path = this.getPathFromNode(this.sysObjectsRefs[item]);
    this.setNewPath(path);
  }

  setNewPath(newPath: string) {
    if (this.getPath() === newPath) {
      return;
    }

    this.setPath(newPath);
    this.setCurrentFolder();
    this.buildInteractivePath();
    this.setHistory(newPath);
    this.setDisplayLocation();
  }

  setPath(path: string) {
    this.path$.next(path);
  }

  buildInteractivePath() {
    const path = this.getPath();
    const newPath = [];

    // Check whether path is prepared view, not dynamic
    if (path.startsWith('$')) {
      const name = this.getNameFromViewPath(path);

      newPath.push({
        label: name,
        path: path,
      });

      this.pathUrl$.next(newPath);
      return;
    }

    // Split path to array
    let arr = this.splitPath(path);
    if (!arr) return;

    // First path element is always This PC
    const name = this.getNameFromViewPath(THIS_PC);
    newPath.push({
      label: name,
      path: THIS_PC,
    });

    // Build path elements from array
    for (let i = 0; i < arr.length; i++) {
      let path = '';

      for (let j = 0; j <= i; j++) {
        path += arr[j] + '\\';
      }

      let node = this.getNodeFromPath(path);

      // TODO! - Jak to wyleci to znaczy że coś się skurwiło ostro XDDD
      if (!node) {
        throw new Error("Can't find node by path: " + path);
      }

      newPath.push({
        label: node.node.name,
        path,
        node,
      });
    }

    // Update path
    this.pathUrl$.next(newPath);
  }

  getNameFromViewPath(path: string): string {
    if (path === THIS_PC) {
      return 'This PC';
    } else if (path === QUICK_ACCESS) {
      return 'Quick access';
    } else if (path === LIBRARIES) {
      return 'Libraries';
    }

    return '';
  }

  // undefined when path is view eg. `$ThisPc`, `$QuickAccess`
  setCurrentFolder() {
    const currentNode = this.getNodeFromPath(this.getPath());

    if (currentNode instanceof FSDevice || currentNode instanceof FSFolder) {
      this.currentFolder$.next(currentNode);
    } else {
      this.currentFolder$.next(undefined);
    }
  }

  setDisplayLocation() {
    const path = this.getPath();

    if (path.startsWith('$')) {
      const name = this.getNameFromViewPath(path);
      this.displayLocation$.next(name);
      return;
    }

    this.displayLocation$.next(path);
  }

  getFsObs() {
    return this.fs$.asObservable();
  }

  getFs() {
    return this.fs$.value;
  }

  getCurrentDevice() {
    return this.osDevice;
  }

  getPath() {
    return this.path$.value;
  }

  getPathObs() {
    return this.path$.asObservable();
  }

  getCurrentFolderObs() {
    return this.currentFolder$.asObservable();
  }

  getCurrentFolder() {
    return this.currentFolder$.value;
  }

  getHistoryObs() {
    return this.history$.asObservable();
  }

  getHistory() {
    return this.history$.value;
  }

  getSelectedItemsObs() {
    return this.selectedItems$.asObservable();
  }

  getSelectedItems() {
    return this.selectedItems$.value;
  }

  getDevice(letter: string) {
    return this.fs$.value[letter];
  }

  getPathUrlObs() {
    return this.pathUrl$.asObservable();
  }

  getPathUrl() {
    return this.pathUrl$.value;
  }

  getDisplayLocationObs() {
    return this.displayLocation$.asObservable();
  }

  getDisplayLocation() {
    return this.displayLocation$.value;
  }

  getThisPcRefsObs() {
    return this.thisPcRefs$.asObservable();
  }

  getThisPcRefs() {
    return this.thisPcRefs$.value;
  }

  getQuickAccessRefsObs() {
    return this.quickAccessRefs$.asObservable();
  }

  getQuickAccessRefs() {
    return this.quickAccessRefs$.value;
  }
}
