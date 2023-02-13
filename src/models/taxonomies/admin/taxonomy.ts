import { Expose, plainToClassFromExist } from "class-transformer";
import { IBaseMinimalEntity } from "../../common/base-entities";

export enum TaxonomyTypeEnum {
  MENU = "MENU",
  MENU_ITEM = "MENU_ITEM",
  CATEGORY = "CATEGORY",
  PROJECT_CATEGORY = "PROJECT_CATEGORY",
  TAG = "TAG"
}

export enum TaxonomyErrorsEnum {
  DUPLICATE_TAXONOMY = 'Duplicate Taxonomy',
  DUPLICATE_SLUG = 'Duplicate Slug',
}

export enum TaxonomyErrorsInternalCodeEnum {
  DUPLICATE_TAXONOMY = 4001,
  DUPLICATE_SLUG = 4002,
}

export interface ITaxonomyEntity extends IBaseMinimalEntity {
  type: TaxonomyTypeEnum;
  href?: string;
  order?: number;
  parent?: ITaxonomyEntity;
  children?: ITaxonomyEntity[];
  childLevel?: number;
  description: string | null;
  term: string;
  slug: string;
  featuredImage?: string;
  slugsHistory: ITaxonomySlugsHistoryEntity[];
}

export interface ITaxonomySlugsHistoryEntity extends IBaseMinimalEntity {
  slug: string;
  taxonomy: ITaxonomyEntity;
}

export class TaxonomyCreateFormValues {
  @Expose() type: TaxonomyTypeEnum = TaxonomyTypeEnum.CATEGORY;
  @Expose() href?: string = '';
  @Expose() order?: number = 0;
  @Expose() parentId?: string = undefined;
  @Expose() description?: string = '';
  @Expose() term: string = '';
  @Expose() slug: string = '';
  @Expose() featuredImage?: string = '';

  constructor ( init?: TaxonomyCreateFormValues ) {
    plainToClassFromExist(
      this,
      init,
      { excludeExtraneousValues: true }
    );
  }
}

export class TaxonomyEditFormValues {
  @Expose() href?: string = '';
  @Expose() order?: number = 0;
  @Expose() description?: string = undefined;
  @Expose() term: string = '';
  @Expose() slug: string = '';
  @Expose() featuredImage?: string = '';

  constructor ( init?: TaxonomyCreateFormValues ) {
    plainToClassFromExist(
      this,
      init,
      { excludeExtraneousValues: true }
    );
  }
}