import { FSItemsView } from './../../../models/types';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FSFile } from 'src/app/models/fs-file';
import { FSFolder } from 'src/app/models/fs-folder';
import { FileSystemService } from 'src/app/services/file-system.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-default-view',
  templateUrl: './default-view.component.html',
  styleUrls: ['./default-view.component.scss'],
})
export class DefaultViewComponent implements OnDestroy {
  public items!: FSItemsView;

  pathSubscritpion: Subscription;
  fsSubscription: Subscription;

  constructor(private fileSystemService: FileSystemService) {
    // If path changes, update items
    this.pathSubscritpion = this.fileSystemService
      .getPathObs()
      .subscribe(() => {
        this.items = this.fileSystemService.listNodesFromPath();
      });

    // If fs changes, update items
    this.fsSubscription = this.fileSystemService.getFsObs().subscribe(() => {
      this.items = this.fileSystemService.listNodesFromPath();
    });
  }

  ngOnDestroy(): void {
    this.pathSubscritpion.unsubscribe();
    this.fsSubscription.unsubscribe();
  }
}
