import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FileSystemService } from 'src/app/services/file-system.service';

@Component({
  selector: 'app-address-bar',
  templateUrl: './address-bar.component.html',
  styleUrls: ['./address-bar.component.scss'],
})
export class AddressBarComponent implements OnDestroy {
  pathUrl!: { label: string; path: string }[];
  pathSubscription: Subscription;

  icon!: number;
  iconSubscription: Subscription;

  constructor(private fileSystemService: FileSystemService) {
    this.pathSubscription = this.fileSystemService
      .getPathUrlObs()
      .subscribe((pathUrl) => {
        this.pathUrl = pathUrl;
      });

    this.iconSubscription = this.fileSystemService
      .getCurrentIconObs()
      .subscribe((icon) => {
        this.icon = icon;
      });
  }

  openFolder(path: string) {
    this.fileSystemService.setNewPath(path);
  }

  ngOnDestroy(): void {
    this.pathSubscription.unsubscribe();
    this.iconSubscription.unsubscribe();
  }
}
