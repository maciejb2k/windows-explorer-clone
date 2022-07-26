import { FSItemsView, FSObjects } from './../../models/types';
import {} from '../../common/constants';
import { Component, OnInit } from '@angular/core';
import {
  THIS_PC,
  LIBRARIES,
  RECYCLE_BIN,
  QUICK_ACCESS,
  DOCUMENTS,
  MUSIC,
  PICTURES,
  VIDEOS,
  DOWNLOADS,
  DESKTOP,
  PUBLIC,
  OBJECTS_3D,
  USER_HOME,
} from 'src/app/common/constants';
import { FileSystemService } from 'src/app/services/file-system.service';
import { FSDevice } from 'src/app/models/fs-device';
import { FSFolder } from 'src/app/models/fs-folder';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss'],
})
export class TreeViewComponent {
  readonly THIS_PC = THIS_PC;
  readonly LIBRARIES = LIBRARIES;
  readonly RECYCLE_BIN = RECYCLE_BIN;
  readonly QUICK_ACCESS = QUICK_ACCESS;
  readonly DOCUMENTS = DOCUMENTS;
  readonly MUSIC = MUSIC;
  readonly PICTURES = PICTURES;
  readonly VIDEOS = VIDEOS;
  readonly DOWNLOADS = DOWNLOADS;
  readonly DESKTOP = DESKTOP;
  readonly PUBLIC = PUBLIC;
  readonly OBJECTS_3D = OBJECTS_3D;
  readonly USER_HOME = USER_HOME;

  groupsOpened: { [key: string]: boolean } = {
    quickAccess: true,
    thisPc: true,
    libraries: true,
    network: false,
  };

  public quickAccessTree: FSObjects[] = [];
  public thisPcTree: FSObjects[] = [];

  constructor(private fileSystemService: FileSystemService) {
    this.fileSystemService.getQuickAccessRefsObs().subscribe((value) => {
      value.forEach((group) => {
        this.quickAccessTree.push(...group.children);
      });
    });

    this.fileSystemService.getThisPcRefsObs().subscribe((value) => {
      value.forEach((group) => {
        this.thisPcTree.push(...group.children);
      });
    });
  }

  toggleGroup(e: Event, name: string) {
    e.stopPropagation();
    this.groupsOpened[name] = !this.groupsOpened[name];
  }

  openFolder(node: FSObjects) {
    if (node instanceof FSFolder || node instanceof FSDevice) {
      // Get path of node
      const nodePath = this.fileSystemService.getPathFromNode(node);

      // Set new path based on path string
      this.fileSystemService.setNewPath(nodePath);
    }
  }

  // TODO! - WYKURWIĆ TO W PRZYSZŁOŚCI I ZROBIĆ BIBLIOTEKI TEŻ Z VIEW
  openSystemObject(item: string) {
    this.fileSystemService.openSystemObject(item);
  }

  openView(path: string) {
    this.fileSystemService.setNewPath(path);
  }
}
