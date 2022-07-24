import { FileSystemService } from 'src/app/services/file-system.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  hasPrevious!: boolean;
  hasNext!: boolean;

  constructor(private fileSystemService: FileSystemService) {
    this.fileSystemService.getHistoryObs().subscribe((value) => {
      this.hasPrevious = value.hasPrevious();
      this.hasNext = value.hasNext();
    });
  }

  moveUp() {
    this.fileSystemService.moveUp();
  }

  moveBack() {
    this.fileSystemService.moveBack();
  }

  moveForward() {
    this.fileSystemService.moveForward();
  }

  ngOnInit(): void {}
}
