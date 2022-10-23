import { IBaseMinimalEntity } from "../../common/base-entities";
import { IFileEntity } from "../../files/admin/file";
import { IPostEntity } from "../../posts/admin/post";

export enum TaxonomyTypeEnum {
  MENU = "MENU",
  MENU_ITEM = "MENU_ITEM",
  CATEGORY = "CATEGORY",
  TAG = "TAG"
}

export interface ITaxonomyEntity extends IBaseMinimalEntity {
  type: TaxonomyTypeEnum;
  href: string;
  order?: number;
  parent?: ITaxonomyEntity;
  description: string | null;
  term: string;
  slug: string;
  featuredImage?: IFileEntity;
  slugsHistory: IPostSlugsHistoryEntity[];
}

export interface IPostSlugsHistoryEntity extends IBaseMinimalEntity {
  slug: string;
  post: IPostEntity;
}