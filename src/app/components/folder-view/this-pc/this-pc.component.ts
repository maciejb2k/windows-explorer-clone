import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FSItemsView } from 'src/app/models/types';
import { FileSystemService } from 'src/app/services/file-system.service';

@Component({
  selector: 'app-this-pc',
  templateUrl: './this-pc.component.html',
  styleUrls: ['./this-pc.component.scss'],
})
export class ThisPCComponent implements OnDestroy {
  public items!: FSItemsView;
  itemsSubscription: Subscription;

  constructor(private fileSystemService: FileSystemService) {
    this.itemsSubscription = this.fileSystemService
      .getThisPcRefsObs()
      .subscribe((value) => {
        this.items = value;
      });
  }

  ngOnDestroy(): void {
    this.itemsSubscription.unsubscribe();
  }
}
