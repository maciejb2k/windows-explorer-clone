import { FSDevice } from './fs-device';
import { FSDevices } from './types';

export const initDevices: FSDevices = {
  'C:': new FSDevice({
    node: {
      name: 'disk0',
      icon: 14,
      parent: null,
    },
    folder: {
      isSystem: true,
    },
    device: {
      letter: 'C:',
      isOs: true,
      space: 256565656565656,
    },
  }),
  'D:': new FSDevice({
    node: {
      name: 'disk1',
      icon: 14,
      parent: null,
    },
    folder: {
      isSystem: false,
    },
    device: {
      letter: 'D:',
      isOs: false,
      space: 256565656565656,
    },
  }),
  'K:': new FSDevice({
    node: {
      name: 'disk2',
      icon: 14,
      parent: null,
    },
    folder: {
      isSystem: false,
    },
    device: {
      letter: 'K:',
      isOs: false,
      space: 256565656565656,
    },
  }),
};

export const initFS = [
  {
    type: 'folder',
    name: 'PerfLogs',
    icon: 14,
    isSystem: true,
    children: [],
  },
  {
    type: 'folder',
    name: 'Program Files (x86)',
    icon: 14,
    isSystem: true,
    children: [],
  },
  {
    type: 'folder',
    name: 'Program Files',
    icon: 14,
    isSystem: true,
    children: [],
  },
  {
    type: 'folder',
    name: 'Users',
    icon: 14,
    isSystem: true,
    children: [
      {
        type: 'folder',
        name: 'Public',
        icon: 14,
        isSystem: true,
        children: [],
      },
      {
        type: 'folder',
        name: 'Maciej',
        icon: 987,
        isSystem: true,
        children: [
          {
            type: 'folder',
            name: '.vscode',
            icon: 14,
            isSystem: true,
            children: [],
          },
          {
            type: 'folder',
            name: 'Desktop',
            icon: 910,
            isSystem: true,
            children: [
              {
                type: 'folder',
                name: 'Recycle Bin',
                icon: 437,
                isSystem: true,
                children: [],
              },
              {
                type: 'file',
                name: 'newDocument',
                extension: 'txt',
              },
              {
                type: 'file',
                name: 'watykanczyk',
                extension: 'exe',
              },
              {
                type: 'file',
                name: 'jebackomucha',
                extension: 'xlsx',
              },
            ],
          },
          {
            type: 'folder',
            name: 'Documents',
            icon: 795,
            isSystem: true,
            children: [],
          },
          {
            type: 'folder',
            name: 'Downloads',
            icon: 1428,
            isSystem: true,
            children: [],
          },
          {
            type: 'folder',
            name: 'OneDrive',
            icon: 14,
            isSystem: true,
            children: [],
          },
          {
            type: 'folder',
            name: 'Music',
            icon: 896,
            isSystem: true,
            children: [],
          },
          {
            type: 'folder',
            name: 'Pictures',
            icon: 563,
            isSystem: true,
            children: [],
          },
          {
            type: 'folder',
            name: 'Videos',
            icon: 107,
            isSystem: true,
            children: [
              {
                type: 'file',
                name: 'example filmik',
                extension: 'mp4',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: 'folder',
    name: 'Windows',
    icon: 14,
    isSystem: true,
    children: [],
  },
];
