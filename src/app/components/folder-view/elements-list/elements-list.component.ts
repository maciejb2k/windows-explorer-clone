import { settings } from './../../../services/file-system.service';
import { Subscription } from 'rxjs';
import { FSItems, FSItemsView, FSObjects } from './../../../models/types';
import { FSDevice } from 'src/app/models/fs-device';
import { FileSystemService } from 'src/app/services/file-system.service';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { FSFile } from 'src/app/models/fs-file';
import { FSFolder } from 'src/app/models/fs-folder';

@Component({
  selector: 'app-elements-list',
  templateUrl: './elements-list.component.html',
  styleUrls: ['./elements-list.component.scss'],
})
export class ElementsListComponent implements OnChanges, OnDestroy {
  @Input() items!: FSItemsView;
  @Input() hasGroups!: boolean;

  selected: FSObjects[] = [];
  selectedSubscription: Subscription;

  newItems!: FSItems | undefined;
  newItemsSubscription: Subscription;

  settings!: settings;
  settingsSubscription: Subscription;

  isRenaming: boolean = false;

  groupsOpened: { [key: string]: boolean } = {};
  selectedNodes: { [key: string]: FSObjects } = {};

  constructor(
    private fileSystemService: FileSystemService,
    private elRef: ElementRef,
    private cd: ChangeDetectorRef
  ) {
    this.selectedSubscription = this.fileSystemService
      .getSelectedItemsObs()
      .subscribe((value) => {
        this.selected = value;
        this.selectItemsInView();
      });

    this.settingsSubscription = this.fileSystemService
      .getSettingsObs()
      .subscribe((value) => {
        this.settings = value;
      });

    this.newItemsSubscription = this.fileSystemService
      .getNewItemsObs()
      .subscribe((newItems) => {
        this.newItems = newItems;

        // When put outside of ngOnChanges, it doesn't know about changes in fs
        // New file hasn't been added yet to this.items
        if (this.newItems) {
          this.cd.detectChanges();

          // Za to pójde do więzienia kiedyś XD
          setTimeout(() => this.enableRenaming(), 0);
        }
      });
  }

  toggleGroup(e: Event, name: string) {
    e.stopPropagation();
    this.groupsOpened[name] = !this.groupsOpened[name];
  }

  openFolder(node: FSObjects) {
    if (this.newItems && node.node.name === this.newItems.node.name) {
      return;
    }

    if (node instanceof FSFolder || node instanceof FSDevice) {
      // Get path of node
      const nodePath = this.fileSystemService.getPathFromNode(node);

      // Set new path based on path string
      this.fileSystemService.setNewPath(nodePath);
    }
  }

  selectItemsInView() {
    this.selectedNodes = {};

    this.selected.forEach(
      (item) => (this.selectedNodes[item.node.name] = item)
    );
  }

  selectItem(e: MouseEvent, node: FSObjects) {
    // If it wasn't single click, this function shouldn't be called
    if (e.detail !== 1) {
      return;
    }

    if (this.newItems && node.node.name === this.newItems.node.name) {
      return;
    }

    if (!e.ctrlKey) {
      this.selectedNodes = {};
    }

    setTimeout(() => {
      this.selectedNodes[node.node.name]
        ? delete this.selectedNodes[node.node.name]
        : (this.selectedNodes[node.node.name] = node);

      this.updateSelectedItems();
    }, 0);
  }

  clickOutside(e: MouseEvent) {
    if (!e.ctrlKey && Object.keys(this.selectedNodes).length > 0) {
      this.deselectAll();
      return;
    }
  }

  enableRenaming() {
    // Find span element with name of new item
    const renamingItem = [
      ...this.elRef.nativeElement.querySelectorAll('.item__name'),
    ].filter((item) => item.textContent === this.newItems!.node.name);

    // Check if there is such element
    if (!renamingItem.length) return;

    // Focus span element
    const refNode = renamingItem[0];
    refNode.focus();

    // Select all text inside span element
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(refNode);
    selection?.removeAllRanges();
    selection?.addRange(range);
  }

  blurItem(e: Event) {
    e.preventDefault();

    const target = e.target as HTMLSpanElement;
    target.blur();
  }

  renameItem(e: Event, node: FSObjects, ref: HTMLSpanElement) {
    e.preventDefault();

    this.isRenaming = false;
    const input = e.target as HTMLSpanElement;
    const newName = input.textContent;

    this.fileSystemService.clearNewItems();

    if (
      !newName ||
      !node.node.parent ||
      (node instanceof FSFolder &&
        this.fileSystemService.doesFolderExists(newName, node.node.parent)) ||
      (node instanceof FSFile &&
        (!this.fileSystemService.validateFileName(newName) ||
          this.fileSystemService.doesFileExists(newName, node.node.parent)))
    ) {
      ref.textContent = node.node.name;
      return;
    }

    this.fileSystemService.renameItem(node, newName);
  }

  deselectAll() {
    this.selectedNodes = {};
    this.updateSelectedItems();
  }

  updateSelectedItems() {
    this.fileSystemService.setSelectedItems(Object.values(this.selectedNodes));
  }

  setupSelectedItems() {
    this.groupsOpened = {};
    this.selectedNodes = {};

    this.items.forEach((item) => (this.groupsOpened[item.name] = true));
  }

  countItems() {
    const count = this.items.reduce(
      (sum, group) => (sum += group.children.length),
      0
    );

    this.fileSystemService.setItemsCount(count);
  }

  ngOnChanges(): void {
    this.deselectAll();
    this.setupSelectedItems();
    this.countItems();
  }

  isFileInstance(node: FSObjects) {
    return node instanceof FSFile;
  }

  ngOnDestroy(): void {
    this.deselectAll();
    this.fileSystemService.setItemsCount(0);

    this.selectedSubscription.unsubscribe();
    this.settingsSubscription.unsubscribe();
    this.newItemsSubscription.unsubscribe();
  }
}
