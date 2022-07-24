interface IFileProps {
  extension?: string;
  data?: any;
}

class FileProps implements IFileProps {
  extension: string;
  data: any;

  constructor({ extension = '', data = null }: IFileProps) {
    this.extension = extension;
    this.data = data;
  }
}

export { IFileProps, FileProps };
