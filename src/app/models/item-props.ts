interface IItemProps {
  size?: number;
  dateCreated?: number;
  dateModified?: number;
  isHidden?: boolean;
  isReadonly?: boolean;
}

class ItemProps implements IItemProps {
  size: number;
  dateCreated: number;
  dateModified: number;
  isHidden: boolean;
  isReadonly: boolean;

  constructor({ isHidden = false, isReadonly = false }: IItemProps) {
    this.size = 0;
    this.dateCreated = Date.now();
    this.dateModified = Date.now();
    this.isHidden = isHidden;
    this.isReadonly = isReadonly;
  }
}

export { IItemProps, ItemProps };
