import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FSItemsView } from 'src/app/models/types';
import { FileSystemService } from 'src/app/services/file-system.service';

@Component({
  selector: 'app-quick-access',
  templateUrl: './quick-access.component.html',
  styleUrls: ['./quick-access.component.scss'],
})
export class QuickAccessComponent implements OnDestroy {
  public items!: FSItemsView;
  itemsSubscription: Subscription;

  constructor(private fileSystemService: FileSystemService) {
    this.itemsSubscription = this.fileSystemService
      .getQuickAccessRefsObs()
      .subscribe((value) => {
        this.items = value;
      });
  }

  ngOnDestroy(): void {
    this.itemsSubscription.unsubscribe();
  }
}
