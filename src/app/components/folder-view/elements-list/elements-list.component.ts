import { FSItemsView } from './../../../models/types';
import { FSDevice } from 'src/app/models/fs-device';
import { FileSystemService } from 'src/app/services/file-system.service';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FSFile } from 'src/app/models/fs-file';
import { FSFolder } from 'src/app/models/fs-folder';

@Component({
  selector: 'app-elements-list',
  templateUrl: './elements-list.component.html',
  styleUrls: ['./elements-list.component.scss'],
})
export class ElementsListComponent implements OnInit, OnChanges {
  @Input() items!: FSItemsView;
  @Input() hasGroups!: boolean;

  groupsOpened: { [key: string]: boolean } = {};

  constructor(private fileSystemService: FileSystemService) {}

  toggleGroup(e: Event, name: string) {
    e.stopPropagation();
    this.groupsOpened[name] = !this.groupsOpened[name];
  }

  openFolder(node: any) {
    if (node instanceof FSFolder || node instanceof FSDevice) {
      // Get path of node
      const nodePath = this.fileSystemService.getPathFromNode(node);

      // Set new path based on path string
      this.fileSystemService.setNewPath(nodePath);
    }
  }

  selectItem(node: any) {}

  ngOnInit(): void {
    if (this.hasGroups) {
      this.items.forEach((item) => (this.groupsOpened[item.name] = true));
    }
  }

  ngOnChanges() {}
}
