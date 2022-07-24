import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ribbon',
  templateUrl: './ribbon.component.html',
  styleUrls: ['./ribbon.component.scss'],
})
export class RibbonComponent implements OnInit {
  isRibbonOpened: boolean = true;
  activeTab: string;

  tabs = [
    { name: 'tools', label: 'Home' },
    { name: 'sharing', label: 'Share' },
    { name: 'view', label: 'View' },
  ];

  constructor() {
    this.activeTab = this.tabs[0].name;
  }

  selectTab(tabName: string) {
    if (!this.isRibbonOpened) {
      this.toggleRibbon();
    }
    this.activeTab = tabName;
  }

  toggleRibbon() {
    this.isRibbonOpened = !this.isRibbonOpened;
  }

  ngOnInit(): void {}
}
