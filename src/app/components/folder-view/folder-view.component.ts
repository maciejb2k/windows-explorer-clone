import { FileSystemService } from './../../services/file-system.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  THIS_PC,
  LIBRARIES,
  RECYCLE_BIN,
  QUICK_ACCESS,
} from 'src/app/common/constants';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-folder-view',
  templateUrl: './folder-view.component.html',
  styleUrls: ['./folder-view.component.scss'],
})
export class FolderViewComponent implements OnDestroy {
  // Gówniane obejście bo angular nie zczyta niczego spoza klasy X D
  // wewnątrz template'a.
  readonly THIS_PC = THIS_PC;
  readonly LIBRARIES = LIBRARIES;
  readonly RECYCLE_BIN = RECYCLE_BIN;
  readonly QUICK_ACCESS = QUICK_ACCESS;

  // Tu też inicjuje skurwysyna wewnątrz klasy to sie będzie sadzić
  // że nie bo nie i trzeba wykrzynik postawić.
  // Zaraz wyjebie tą opcje z tsconfiga.
  path!: string;
  pathSubscription: Subscription;

  constructor(private fileSystemService: FileSystemService) {
    this.pathSubscription = this.fileSystemService
      .getPathObs()
      .subscribe((path) => {
        this.path = path;
      });
  }

  ngOnDestroy() {
    this.pathSubscription.unsubscribe();
  }
}
