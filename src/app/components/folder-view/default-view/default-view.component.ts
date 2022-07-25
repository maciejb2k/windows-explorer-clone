import { FSItemsView } from './../../../models/types';
import { Component, Input, OnInit } from '@angular/core';
import { FSFile } from 'src/app/models/fs-file';
import { FSFolder } from 'src/app/models/fs-folder';
import { FileSystemService } from 'src/app/services/file-system.service';

@Component({
  selector: 'app-default-view',
  templateUrl: './default-view.component.html',
  styleUrls: ['./default-view.component.scss'],
})
export class DefaultViewComponent implements OnInit {
  public items!: FSItemsView;

  constructor(private fileSystemService: FileSystemService) {
    this.fileSystemService.getPathObs().subscribe(() => {
      this.items = this.fileSystemService.listNodesFromPath();
    });

    this.fileSystemService.getHistoryObs().subscribe((value) => {
      console.log(value);
    });
  }

  ngOnInit(): void {}
}
