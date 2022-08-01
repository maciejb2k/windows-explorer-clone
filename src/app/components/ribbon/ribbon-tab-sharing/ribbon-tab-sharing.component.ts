import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { setupTestingRouter } from '@angular/router/testing';
import { Subscription } from 'rxjs';
import { FSParentObjects } from 'src/app/models/types';
import { FileSystemService } from 'src/app/services/file-system.service';

const initSettings = {
  // Send
  share: false,
  email: false,
  zip: false,
  burnToDisc: false,
  print: false,
  fax: false,
  // Share with
  group: false,
  removeAccess: false,
  // Unlabeled group
  advancedSecurity: false,
};

@Component({
  selector: 'app-ribbon-tab-sharing',
  templateUrl: './ribbon-tab-sharing.component.html',
  styleUrls: [
    './ribbon-tab-sharing.component.scss',
    '../ribbon-ui/ribbon-ui.scss',
  ],
})
export class RibbonTabSharingComponent implements OnInit, OnDestroy {
  settings: {
    // Send
    share: boolean;
    email: boolean;
    zip: boolean;
    burnToDisc: boolean;
    print: boolean;
    fax: boolean;
    // Share with
    group: boolean;
    removeAccess: boolean;
    // Unlabeled group
    advancedSecurity: boolean;
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

  // TODO! - Dobra ten kod generalnie to jest jeden z największych syfów
  // jaki napisałem w życiu ale no za chuj kurwa nie chce mi się myśleć nad
  // tym bo im dalej próbuje rozkminić jak oni napisali ten jebany
  // eksplorator plików windowsowy to mam ochotę przez okno skoczyć X D.
  //
  // W tej wstążce 'Sharing` to kurwa dla każdego pliku zaznaczonego odpalają
  // się inne kontrolki a inne gaszą i kurwa to jest taki burdel że ja pierdole.
  // Nie wiem pewnie zjebany jestem ale nie wiem po prostu kurwa jak to zrobic.
  //
  // W sensie trzeba by zapierdolić taki refactor, że kazdy obiekt systemowy
  // ma zestaw akcji jakie można na nim wykonać i z niego to odczytywać
  // i na wstażce odpalać odpowiednie permisje, ale to jest kurwa za dużo
  // roboty na jedną osobę.
  ngOnInit(): void {
    this.currentFolderSubscription = this.fileSystemService
      .getCurrentFolderObs()
      .subscribe((value) => {
        this.currentFolder = value;

        if (this.currentFolder) {
          // Jeżeli jestesmy w folderze
          this.settings = {
            ...this.settings,
            group: true,
            removeAccess: true,
            advancedSecurity: true,
          };
        } else {
          // Jeżeli jesteśmy w view
          this.settings = {
            ...this.settings,
            group: false,
            removeAccess: false,
            advancedSecurity: false,
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
          // Jeżeli jesteśmy w folderze i nie w view
          this.settings = {
            ...this.settings,
            share: true,
            email: true,
            zip: true,
            burnToDisc: true,
            print: true,
            fax: true,
            group: true,
            removeAccess: true,
            advancedSecurity: true,
          };
        } else if (this.anySelected) {
          // Jeżeli jestesmy w view
          this.settings = {
            ...this.settings,
            email: true,
            zip: true,
            print: true,
            fax: true,
            group: true,
            removeAccess: true,
            advancedSecurity: true,
          };
        } else {
          if (this.currentFolder) {
            // Jeżeli jesteśmy w folderze to mamy zapalone te domyślne
            // z observable wyżej
            this.settings = {
              ...this.settings,
              share: false,
              email: false,
              zip: false,
              burnToDisc: false,
              print: false,
              fax: false,
            };
          } else {
            // Jeżeli jesteśmy w view to gasimy wszystko
            this.settings = {
              ...this.settings,
              share: false,
              email: false,
              zip: false,
              burnToDisc: false,
              print: false,
              fax: false,
              group: false,
              removeAccess: false,
              advancedSecurity: false,
            };
          }
        }

        // Bez tego wyleci NG0100
        this.cd.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.currentFolderSubscription.unsubscribe();
    this.selectedItemsSubscription.unsubscribe();
  }
}
