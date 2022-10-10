export enum FilePolicyEnum {
  PUBLIC_READ = "public-read",
  PRIVATE = "private"
}

export enum ImageSizeCategories {
  SIZE_75 = "SIZE_75",
  SIZE_160 = "SIZE_160",
  SIZE_240 = "SIZE_320",
  SIZE_480 = "SIZE_480",
  SIZE_640 = "SIZE_640",
  SIZE_800 = "SIZE_800",
  SIZE_1200 = "SIZE_1200",
  SIZE_1600 = "SIZE_1600",
  ORIGINAL = "ORIGINAL"
}

export interface IFile {
  key: string;
  policy: FilePolicyEnum;
  filename: string;
  type: string;
  size: number;
  imageSizeCategory?: ImageSizeCategories;
  originalImage?: IFile;
  videoThumbnail?: IFile;
}