import { Component, OnInit, Input } from '@angular/core';
import { FileSystemService } from 'src/app/services/file-system.service';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.scss'],
  host: { class: 'title-bar' },
})
export class TitleBarComponent implements OnInit {
  location!: string;

  constructor(private fileSystemService: FileSystemService) {
    this.fileSystemService.getDisplayLocationObs().subscribe((location) => {
      this.location = location;
    });
  }

  ngOnInit(): void {}
}
