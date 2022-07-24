import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  isToolbarMenuOpen: boolean = false;

  constructor() {}

  toogleToolbarMenu() {
    this.isToolbarMenuOpen = !this.isToolbarMenuOpen;
  }

  ngOnInit(): void {}
}
