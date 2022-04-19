import { NgModule } from '@angular/core';
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
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
