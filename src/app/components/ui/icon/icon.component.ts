import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss', '../icons.scss'],
})
export class IconComponent {
  @Input() code: number = 16;
  @Input() size: number = 16;

  constructor() {}
}
