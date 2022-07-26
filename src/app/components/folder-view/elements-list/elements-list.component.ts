import { Subscription } from 'rxjs';
import { FSItemsView, FSObjects } from './../../../models/types';
import { FSDevice } from 'src/app/models/fs-device';
import { FileSystemService } from 'src/app/services/file-system.service';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  OnDestroy,
  AfterViewInit,
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

  groupsOpened: { [key: string]: boolean } = {};
  selectedNodes: { [key: string]: FSObjects } = {};

  constructor(private fileSystemService: FileSystemService) {
    this.selectedSubscription = this.fileSystemService
      .getSelectedItemsObs()
      .subscribe((value) => {
        this.selected = value;
      });
  }

  toggleGroup(e: Event, name: string) {
    e.stopPropagation();
    this.groupsOpened[name] = !this.groupsOpened[name];
  }

  openFolder(node: FSObjects) {
    if (node instanceof FSFolder || node instanceof FSDevice) {
      // Get path of node
      const nodePath = this.fileSystemService.getPathFromNode(node);

      // Set new path based on path string
      this.fileSystemService.setNewPath(nodePath);
    }
  }

  selectItem(e: MouseEvent, node: FSObjects) {
    // If it wasn't single click, this function shouldn't be called
    if (e.detail !== 1) {
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

  ngOnDestroy(): void {
    this.deselectAll();
    this.fileSystemService.setItemsCount(0);
    this.selectedSubscription.unsubscribe();
  }
}
