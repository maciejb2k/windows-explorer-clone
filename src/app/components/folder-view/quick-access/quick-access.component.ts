import { Component, OnInit } from '@angular/core';
import { FSItemsView } from 'src/app/models/types';
import { FileSystemService } from 'src/app/services/file-system.service';

@Component({
  selector: 'app-quick-access',
  templateUrl: './quick-access.component.html',
  styleUrls: ['./quick-access.component.scss'],
})
export class QuickAccessComponent implements OnInit {
  public items!: FSItemsView;

  constructor(private fileSystemService: FileSystemService) {
    this.fileSystemService.getQuickAccessRefsObs().subscribe((value) => {
      this.items = value;
    });
  }

  ngOnInit(): void {}
}
