import { IBaseMinimalEntity } from "../../common/base-entities";

export enum FilePolicyEnum {
  PUBLIC_READ = "public-read",
  PRIVATE = "private"
}

export enum FileSectionEnum {
  GENERAL = "GENERAL",
  SITE_LOGO = "SITE_LOGO",
  MAIN_SLIDESHOW = "MAIN_SLIDESHOW",
  USER = "USER",
  BLOG = "BLOG",
  NEWS = "NEWS",
  BRAND_LOGO = "BRAND_LOGO",
  PRODUCT = "PRODUCT",
  COURSE = "COURSE"
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

export enum FileStatus {
  READY = "READY",
  IN_PROGRESS = "IN_PROGRESS",
  FAILED = "FAILED"
}

export interface IFileEntity extends IBaseMinimalEntity {
  key: string;
  policy: FilePolicyEnum;
  filename: string;
  type: string;
  size: number;
  status: FileStatus;
  section: FileSectionEnum;
  imageSizeCategory?: ImageSizeCategories;
  originalImage: File;
  generatedImageChildren: IFileEntity[];
  videoThumbnail: IFileEntity;
}