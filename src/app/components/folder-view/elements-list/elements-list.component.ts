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
  @Input() items!: any;

  constructor(private fileSystemService: FileSystemService) {
    console.log(this.items);
  }

  openFolder(node: any) {
    if (node instanceof FSFolder || node instanceof FSDevice) {
      // Get path of node
      const nodePath = this.fileSystemService.getPath(node);

      // Set new path based on path string
      this.fileSystemService.setPath(nodePath);
    }
  }

  selectItem(node: any) {}

  ngOnInit(): void {}

  ngOnChanges() {
    console.log(this.items);
  }
}
