import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-button-icon',
  templateUrl: './button-icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./button-icon.component.scss', '../icons.scss'],
})
export class ButtonIconComponent implements OnInit {
  @Input() code: number = 3;
  @Input() size: number = 16;
  @Input() title: string = '';
  @Input() desc?: string;

  constructor() {}

  ngOnInit(): void {}
}
