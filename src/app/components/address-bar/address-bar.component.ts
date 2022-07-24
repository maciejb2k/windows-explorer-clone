import { Component, OnInit } from '@angular/core';
import { FileSystemService } from 'src/app/services/file-system.service';

@Component({
  selector: 'app-address-bar',
  templateUrl: './address-bar.component.html',
  styleUrls: ['./address-bar.component.scss'],
})
export class AddressBarComponent implements OnInit {
  pathUrl!: { label: string; path: string }[];

  constructor(private fileSystemService: FileSystemService) {
    this.fileSystemService.getPathUrlObs().subscribe((pathUrl) => {
      this.pathUrl = pathUrl;
    });
  }

  openFolder(path: string) {
    this.fileSystemService.setNewPath(path);
  }

  ngOnInit(): void {}
}
