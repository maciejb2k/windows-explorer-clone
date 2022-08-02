import { FSItems, FSParentObjects } from './../../../models/types';
import { Subscription } from 'rxjs';
import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  OnChanges,
  ChangeDetectorRef,
} from '@angular/core';
import { FileSystemService } from 'src/app/services/file-system.service';

const initSettings = {
  // Clipboard
  pinToQuickAccess: false,
  copy: false,
  paste: false,
  cut: false,
  copyPath: false,
  pasteShortcut: false,
  // Organize
  moveTo: false,
  copyTo: false,
  delete: false,
  rename: false,
  // New
  newFolder: false,
  newItem: false,
  easyAccess: false,
  // Open
  properties: false,
  open: false,
  edit: false,
  history: false,
  // Select
  selectAll: true,
  selectNone: true,
  invertSelection: true,
};

@Component({
  selector: 'app-ribbon-tab-tools',
  templateUrl: './ribbon-tab-tools.component.html',
  styleUrls: [
    './ribbon-tab-tools.component.scss',
    '../ribbon-ui/ribbon-ui.scss',
  ],
})
export class RibbonTabToolsComponent implements OnInit, OnDestroy {
  settings: {
    // Clipboard
    pinToQuickAccess: boolean;
    copy: boolean;
    paste: boolean;
    cut: boolean;
    copyPath: boolean;
    pasteShortcut: boolean;
    // Organize
    moveTo: boolean;
    copyTo: boolean;
    delete: boolean;
    rename: boolean;
    // New
    newFolder: boolean;
    newItem: boolean;
    easyAccess: boolean;
    // Open
    properties: boolean;
    open: boolean;
    edit: boolean;
    history: boolean;
    // Select
    selectAll: boolean;
    selectNone: boolean;
    invertSelection: boolean;
  };

  currentFolder: FSParentObjects | undefined;
  currentFolderSubscription!: Subscription;

  anySelected!: boolean;
  selectedItemsSubscription!: Subscription;

  constructor(
    private fileSystemService: FileSystemService,
    private cd: ChangeDetectorRef
  ) {
    this.settings = initSettings;
  }

  // TODO! - ŚMIETNIK

  /*
   * Generalnie to chuj do dupy albo mi albo komuś kto robił Angulara.
   * Po zmianie w observable w subskrypcji chce zmieniać pola w `this.settings`.
   * No i chuj nie da się. Wykurwia error:
   * NG0100: ExpressionChangedAfterItHasBeenCheckedError
   * Bo wykonuję zmianę w `this.settings` a to jest podpięte już pod template
   * htmlowy i te zmiany się wykonują poza jego tym changes detectorem.
   * No i żeby to rozwiązać trzeba mu manualnie odpalić ten changes detector
   * by se ogarnął. Tu jest to opisane: https://angular.io/errors/NG0100
   * Ale oczywiście kurwa wywołanie changes detectora w konstruktorze
   * rozkurwia aplikacje jeszcze bardziej i chuj wie dlaczego XD
   * Dosłownie chuj wie dlaczego bo do dziś nikt nie ogarnął tego XDDDDDD:
   * https://github.com/angular/angular/issues/32756
   * Ale jak sie to samo przeniesie do ngOnInit to już działa XDXDXDXD
   * Ale znowu wszyscy napisza że nie mozna podpinac pól z klasy w ngOnInit
   * tylko sie powinno w konstruktorze. Wyjebane mam nwm X D
   */

  ngOnInit(): void {
    this.currentFolderSubscription = this.fileSystemService
      .getCurrentFolderObs()
      .subscribe((value) => {
        this.currentFolder = value;

        if (this.currentFolder) {
          this.settings = {
            ...this.settings,
            newFolder: true,
            newItem: true,
            properties: true,
            history: true,
          };
        } else {
          this.settings = {
            ...this.settings,
            newFolder: false,
            newItem: false,
            properties: false,
            history: false,
          };
        }

        // Bez tego wyleci NG0100
        this.cd.detectChanges();
      });

    this.selectedItemsSubscription = this.fileSystemService
      .getSelectedItemsObs()
      .subscribe((value) => {
        this.anySelected = Boolean(value.length);

        if (this.anySelected && this.currentFolder) {
          this.settings = {
            ...this.settings,
            // Clipboard
            copy: true,
            cut: true,
            copyPath: true,
            // Organize
            moveTo: true,
            copyTo: true,
            delete: true,
            rename: true,
            // Open
            properties: true,
            open: true,
          };
        } else if (this.anySelected) {
          this.settings = {
            ...this.settings,
            // Organize
            copyTo: true,
            // Open
            properties: true,
            open: true,
          };
        } else {
          this.settings = {
            ...this.settings,
            // Clipboard
            copy: false,
            cut: false,
            copyPath: false,
            // Organize
            moveTo: false,
            copyTo: false,
            delete: false,
            rename: false,
            // Open
            properties: false,
            open: false,
          };
        }

        // Bez tego wyleci NG0100
        this.cd.detectChanges();
      });
  }

  newFile() {
    this.fileSystemService.createFile();
  }

  newFolder() {
    this.fileSystemService.createFolder();
  }

  deleteItems() {
    this.fileSystemService.deleteItems();
  }

  renameItem() {
    this.fileSystemService.addItemToRename();
  }

  selectAll() {
    this.fileSystemService.selectAll();
  }

  selectNone() {
    this.fileSystemService.selectNone();
  }

  selectInvert() {
    this.fileSystemService.selectInvert();
  }

  ngOnDestroy(): void {
    this.currentFolderSubscription.unsubscribe();
    this.selectedItemsSubscription.unsubscribe();
  }
}
