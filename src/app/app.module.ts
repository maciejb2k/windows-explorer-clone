import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WindowComponent } from './components/window/window.component';
import { TitleBarComponent } from './components/title-bar/title-bar.component';
import { RibbonComponent } from './components/ribbon/ribbon.component';
import { AddressBarComponent } from './components/address-bar/address-bar.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { TreeViewComponent } from './components/tree-view/tree-view.component';
import { FolderViewComponent } from './components/folder-view/folder-view.component';
import { StatusBarComponent } from './components/status-bar/status-bar.component';
import { IconComponent } from './components/ui/icon/icon.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ButtonIconComponent } from './components/ui/button-icon/button-icon.component';
import { RibbonTabToolsComponent } from './components/ribbon/ribbon-tab-tools/ribbon-tab-tools.component';
import { RibbonTabSharingComponent } from './components/ribbon/ribbon-tab-sharing/ribbon-tab-sharing.component';
import { RibbonTabViewComponent } from './components/ribbon/ribbon-tab-view/ribbon-tab-view.component';
import { SearchComponent } from './components/search/search.component';
import { ThisPCComponent } from './components/folder-view/this-pc/this-pc.component';
import { QuickAccessComponent } from './components/folder-view/quick-access/quick-access.component';
import { LibrariesComponent } from './components/folder-view/libraries/libraries.component';
import { RecycleBinComponent } from './components/folder-view/recycle-bin/recycle-bin.component';
import { DefaultViewComponent } from './components/folder-view/default-view/default-view.component';

import { FileSystemService } from './services/file-system.service';
import { ElementsListComponent } from './components/folder-view/elements-list/elements-list.component';

@NgModule({
  declarations: [
    AppComponent,
    WindowComponent,
    TitleBarComponent,
    RibbonComponent,
    AddressBarComponent,
    SearchBoxComponent,
    TreeViewComponent,
    FolderViewComponent,
    StatusBarComponent,
    IconComponent,
    ToolbarComponent,
    ButtonIconComponent,
    RibbonTabToolsComponent,
    RibbonTabSharingComponent,
    RibbonTabViewComponent,
    SearchComponent,
    ThisPCComponent,
    QuickAccessComponent,
    LibrariesComponent,
    RecycleBinComponent,
    DefaultViewComponent,
    ElementsListComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (value: FileSystemService) => () => null,
      deps: [FileSystemService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
