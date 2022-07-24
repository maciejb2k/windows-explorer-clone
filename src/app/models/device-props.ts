interface IDeviceProps {
  letter: string;
  isOs?: boolean;
  space: number;
  spaceUsed?: number;
  spaceFree?: number;
}

class DeviceProps implements IDeviceProps {
  letter: string;
  isOs: boolean;
  space: number;
  spaceUsed: number;
  spaceFree: number;

  constructor({ letter, isOs = false, space }: IDeviceProps) {
    this.letter = letter;
    this.isOs = isOs;
    this.space = space;
    this.spaceUsed = 0;
    this.spaceFree = space;
  }
}

export { IDeviceProps, DeviceProps };
