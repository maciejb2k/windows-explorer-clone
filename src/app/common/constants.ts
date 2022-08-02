export const THIS_PC: string = '$ThisPc';
export const LIBRARIES: string = '$Libraries';
export const RECYCLE_BIN: string = '$RecycleBin';
export const QUICK_ACCESS: string = '$QuickAccess';

export const DOCUMENTS: string = 'Documents';
export const MUSIC: string = 'Music';
export const PICTURES: string = 'Pictures';
export const VIDEOS: string = 'Videos';
export const DOWNLOADS: string = 'Downloads';
export const DESKTOP: string = 'Desktop';
export const PUBLIC: string = 'Public';
export const OBJECTS_3D: string = '3D Objects';
export const USER_HOME: string = 'USER_HOME';

export const SYSTEM_FOLDERS: string[] = [
  DOCUMENTS,
  MUSIC,
  PICTURES,
  VIDEOS,
  DOWNLOADS,
  DESKTOP,
  PUBLIC,
  OBJECTS_3D,
];

export const VIEW_THIS_PC: string[] = [
  OBJECTS_3D,
  DESKTOP,
  DOCUMENTS,
  DOWNLOADS,
  MUSIC,
  PICTURES,
  VIDEOS,
];

export const VIEW_QUICK_ACCESS: string[] = [DESKTOP, DOWNLOADS, USER_HOME];

export const INIT_LOCATION = THIS_PC;
export const INIT_ICON = 903;

export const NEW_FOLDER_DEFAULT_NAME = 'New folder';
export const NEW_FILE_DEFAULT_NAME = 'New document';

export const SETTINGS = {
  pane: '',
  layout: 'list',
  itemCheckBoxes: false,
  fileNameExtensions: true,
  hiddenItems: true,
};

export const EXTENSIONS_ICONS: { [key: string]: number } = {
  txt: 882,
  jpg: 563,
  png: 693,
  exe: 60,
  iso: 341,
  bmp: 549,
  mp3: 1045,
  mp4: 107,
  ttf: 1239,
  zip: 1356,
  ini: 3444,
};

export const VIEWS_ICONS: { [key: string]: number } = {
  [THIS_PC]: 903,
  [QUICK_ACCESS]: 3584,
  [LIBRARIES]: 1854,
};
