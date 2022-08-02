import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FileSystemService } from 'src/app/services/file-system.service';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.scss'],
})
export class TitleBarComponent implements OnDestroy {
  location!: string;
  locationSubscription: Subscription;

  icon!: number;
  iconSubscription: Subscription;

  constructor(private fileSystemService: FileSystemService) {
    this.locationSubscription = this.fileSystemService
      .getDisplayLocationObs()
      .subscribe((location) => {
        this.location = location;
      });

    this.iconSubscription = this.fileSystemService
      .getCurrentIconObs()
      .subscribe((icon) => {
        this.icon = icon;
      });
  }

  ngOnDestroy(): void {
    this.locationSubscription.unsubscribe();
    this.iconSubscription.unsubscribe();
  }
}
