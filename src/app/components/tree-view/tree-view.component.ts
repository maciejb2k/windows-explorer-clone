import {} from './../../common/views-constants';
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
} from 'src/app/common/views-constants';
import { FileSystemService } from 'src/app/services/file-system.service';
import { FSDevice } from 'src/app/models/fs-device';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss'],
})
export class TreeViewComponent implements OnInit {
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

  public devices!: { [key: string]: FSDevice };

  constructor(private fileSystemService: FileSystemService) {
    console.log(this.fileSystemService.sysObjectsRefs);

    this.fileSystemService.getDevicesObs().subscribe((devices) => {
      this.devices = devices;
    });

    console.log(this.devices);
  }

  ngOnInit(): void {}
  path!: string;

  toggleGroup(e: Event, name: string) {
    e.stopPropagation();
    this.groupsOpened[name] = !this.groupsOpened[name];
  }

  openView(path: string) {
    this.fileSystemService.setNewPath(path);
  }

  openFolder(item: string) {
    this.fileSystemService.openSystemObject(item);
  }

  openDevice(letter: string) {
    this.fileSystemService.openDevice(letter);
  }
}
