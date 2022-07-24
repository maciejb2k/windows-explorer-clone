import { FSDevice } from './fs-device';
import { FSDevices } from './types';

export const initDevices: FSDevices = {
  'C:': new FSDevice({
    node: {
      name: 'OS',
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
      name: 'Storage',
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
      name: 'Backup',
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

export const initFS: any = {
  'C:': [
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
          isUserHome: true,
          children: [
            {
              type: 'folder',
              name: '.vscode',
              icon: 14,
              isSystem: false,
              children: [],
            },
            {
              type: 'folder',
              name: '3D Objects',
              icon: 1634,
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
                  name: 'Text document',
                  extension: 'txt',
                },
                {
                  type: 'file',
                  name: 'watykanczyk',
                  extension: 'exe',
                },
                {
                  type: 'file',
                  name: 'slodkie_kotki',
                  extension: 'xlsx',
                },
              ],
            },
            {
              type: 'folder',
              name: 'Documents',
              icon: 795,
              isSystem: true,
              children: [
                {
                  type: 'folder',
                  name: 'Adobe',
                  icon: 14,
                  isSystem: false,
                  children: [],
                },
                {
                  type: 'folder',
                  name: 'My Games',
                  icon: 14,
                  isSystem: false,
                  children: [],
                },
                {
                  type: 'folder',
                  name: 'WindowsPowerShell',
                  icon: 14,
                  isSystem: false,
                  children: [],
                },
                {
                  type: 'folder',
                  name: 'Configs',
                  icon: 14,
                  isSystem: false,
                  children: [],
                },
              ],
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
              children: [
                {
                  type: 'folder',
                  name: 'Camera Roll',
                  icon: 14,
                  isSystem: false,
                  children: [],
                },
                {
                  type: 'folder',
                  name: 'Screenshots',
                  icon: 14,
                  isSystem: false,
                  children: [],
                },
              ],
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
                {
                  type: 'folder',
                  name: 'Captures',
                  icon: 14,
                  isSystem: false,
                  children: [],
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
  ],
  'D:': [
    {
      type: 'folder',
      name: 'Backup',
      icon: 14,
      isSystem: false,
      children: [],
    },
    {
      type: 'folder',
      name: 'Dev',
      icon: 14,
      isSystem: false,
      children: [],
    },
    {
      type: 'folder',
      name: 'Games',
      icon: 14,
      isSystem: false,
      children: [],
    },
    {
      type: 'folder',
      name: 'Programs',
      icon: 14,
      isSystem: false,
      children: [],
    },
    {
      type: 'folder',
      name: 'Work',
      icon: 14,
      isSystem: false,
      children: [],
    },
  ],
  'K:': [
    {
      type: 'folder',
      name: 'Archive',
      icon: 14,
      isSystem: false,
      children: [],
    },
  ],
};
