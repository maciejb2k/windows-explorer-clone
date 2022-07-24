import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss'],
})
export class TreeViewComponent implements OnInit {
  groupsOpened: { [key: string]: boolean } = {
    quickAccess: true,
    thisPc: true,
    libraries: true,
    network: false,
  };

  constructor() {}

  ngOnInit(): void {}

  toggleGroup(name: string) {
    this.groupsOpened[name] = !this.groupsOpened[name];
  }
}
