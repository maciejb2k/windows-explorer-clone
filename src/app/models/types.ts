import { FSDevice } from './fs-device';
import { FSFile } from './fs-file';
import { FSFileBuilder } from './fs-file-builder';
import { FSFolder } from './fs-folder';
import { FSFolderBuilder } from './fs-folder-builder';

export type FSObjects = FSFile | FSFolder | FSDevice;
export type FSItems = FSFile | FSFolder;
export type FSParentObjects = FSDevice | FSFolder;
export type FSJson = { [key: string]: any }[];
export type FSBuilders = FSFolderBuilder | FSFileBuilder;
export type FSDevices = { [key: string]: FSDevice };
