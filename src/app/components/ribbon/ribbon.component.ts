import { THIS_PC } from 'src/app/common/constants';
import { Subscription } from 'rxjs';
import { FileSystemService } from 'src/app/services/file-system.service';
import { Component, OnDestroy } from '@angular/core';

type tabItem = { name: string; label: string; hidden: boolean };

@Component({
  selector: 'app-ribbon',
  templateUrl: './ribbon.component.html',
  styleUrls: ['./ribbon.component.scss'],
})
export class RibbonComponent implements OnDestroy {
  isRibbonOpened: boolean = true;
  activeTab!: tabItem;

  pathSubscription: Subscription;

  tabs = [
    { name: 'tools', label: 'Home', hidden: false },
    { name: 'sharing', label: 'Share', hidden: false },
    { name: 'view', label: 'View', hidden: false },
  ];

  constructor(private fileSystemService: FileSystemService) {
    this.pathSubscription = this.fileSystemService
      .getPathObs()
      .subscribe((value) => {
        if (value === THIS_PC) {
          this.tabs[0].hidden = true;
          this.tabs[1].hidden = true;
        } else {
          this.tabs[0].hidden = false;
          this.tabs[1].hidden = false;
        }

        this.setNearestTabToActive();
      });
  }

  setNearestTabToActive() {
    const activeTab = this.tabs.find((tab) => !tab.hidden);
    if (activeTab) {
      this.activeTab = activeTab;
    }
  }

  selectTab(tab: tabItem) {
    if (!this.isRibbonOpened) {
      this.toggleRibbon();
    }
    this.activeTab = tab;
  }

  toggleRibbon() {
    this.isRibbonOpened = !this.isRibbonOpened;
  }

  ngOnDestroy() {
    this.pathSubscription.unsubscribe();
  }
}
