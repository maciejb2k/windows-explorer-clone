import { FileSystemService } from 'src/app/services/file-system.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnDestroy {
  hasPrevious!: boolean;
  hasNext!: boolean;
  historySubscription: Subscription;

  constructor(private fileSystemService: FileSystemService) {
    this.historySubscription = this.fileSystemService
      .getHistoryObs()
      .subscribe((value) => {
        this.hasPrevious = value.hasPrevious();
        this.hasNext = value.hasNext();
      });
  }

  moveUp() {
    this.fileSystemService.moveUp();
  }

  moveBack() {
    this.fileSystemService.moveBack();
  }

  moveForward() {
    this.fileSystemService.moveForward();
  }

  ngOnDestroy(): void {
    this.historySubscription.unsubscribe();
  }
}
