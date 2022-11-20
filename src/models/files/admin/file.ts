import { Expose, plainToClassFromExist } from "class-transformer";
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
  SIZE_320 = "SIZE_320",
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

// Watermark Placement Enum
export enum FilesWatermarkPlacementEnum {
  TOP_RIGHT = "TOP_RIGHT",
  TOP_CENTER = "TOP_CENTER",
  TOP_LEFT = "TOP_LEFT",
  MIDDLE = "MIDDLE",
  BOTTOM_RIGHT = "BOTTOM_RIGHT",
  BOTTOM_CENTER = "BOTTOM_CENTER",
  BOTTOM_LEFT = "BOTTOM_LEFT"
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
  originalImage: IFileEntity;
  generatedImageChildren: IFileEntity[];
  thumbnail: string | null;
  imageAlt: string | null;
}

export class FileCreateFormValues implements Partial<IFileEntity> {
  @Expose() key: string = '';
  @Expose() policy: FilePolicyEnum = FilePolicyEnum.PUBLIC_READ;
  @Expose() filename: string = '';
  @Expose() type: string = '';
  @Expose() size: number = 0;
  @Expose() section: FileSectionEnum = FileSectionEnum.GENERAL;
  @Expose() imageAlt: string = '';

  constructor ( init?: FileCreateFormValues ) {
    plainToClassFromExist(
      this,
      init,
      { excludeExtraneousValues: true }
    );
  }
}

export class FileUpdateFormValues implements Partial<IFileEntity> {
  @Expose() filename?: string = undefined;
  @Expose() imageAlt?: string = undefined;
  @Expose() thumbnail?: string = undefined;

  constructor ( init?: FileUpdateFormValues ) {
    plainToClassFromExist(
      this,
      init,
      { excludeExtraneousValues: true }
    );
  }
}