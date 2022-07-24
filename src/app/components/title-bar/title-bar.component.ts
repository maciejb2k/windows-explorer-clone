import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.scss'],
  host: { class: 'title-bar' },
})
export class TitleBarComponent implements OnInit {
  @Input() name!: string;

  constructor() {}

  ngOnInit(): void {}
}
