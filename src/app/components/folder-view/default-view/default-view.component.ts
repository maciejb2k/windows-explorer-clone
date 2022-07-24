import { Component, Input, OnInit } from '@angular/core';
import { FileSystemService } from 'src/app/services/file-system.service';

@Component({
  selector: 'app-default-view',
  templateUrl: './default-view.component.html',
  styleUrls: ['./default-view.component.scss'],
})
export class DefaultViewComponent implements OnInit {
  public items!: Object[];

  constructor(private fileSystemService: FileSystemService) {
    this.fileSystemService.getPathObs().subscribe(() => {
      this.items = this.fileSystemService.listNodesFromPath();
    });

    this.fileSystemService.getHistoryObs().subscribe((value) => {
      console.log(value);
    });
  }

  ngOnInit(): void {
    console.log(this.items);
  }
}
