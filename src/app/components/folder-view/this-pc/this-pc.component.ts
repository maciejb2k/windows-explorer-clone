import { Component, OnInit } from '@angular/core';
import { FSItemsView } from 'src/app/models/types';
import { FileSystemService } from 'src/app/services/file-system.service';

@Component({
  selector: 'app-this-pc',
  templateUrl: './this-pc.component.html',
  styleUrls: ['./this-pc.component.scss'],
})
export class ThisPCComponent implements OnInit {
  public items!: FSItemsView;

  constructor(private fileSystemService: FileSystemService) {
    this.fileSystemService.getThisPcRefsObs().subscribe((value) => {
      this.items = value;
      console.log(value);
    });
  }

  ngOnInit(): void {}
}
