import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FSObjects } from 'src/app/models/types';
import { FileSystemService } from 'src/app/services/file-system.service';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss'],
})
export class StatusBarComponent implements OnDestroy {
  selected: FSObjects[] = [];
  count: number = 0;

  selectedSubscription: Subscription;
  countSubscription: Subscription;

  constructor(private fileSystemService: FileSystemService) {
    this.selectedSubscription = this.fileSystemService
      .getSelectedItemsObs()
      .subscribe((value) => {
        this.selected = value;
      });

    this.countSubscription = this.fileSystemService
      .getItemsCountObs()
      .subscribe((value) => {
        this.count = value;
      });
  }

  ngOnDestroy(): void {
    this.selectedSubscription.unsubscribe();
    this.countSubscription.unsubscribe();
  }
}
