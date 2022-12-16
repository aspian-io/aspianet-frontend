import { Expose, plainToClassFromExist, Transform } from "class-transformer";
import { IBaseEntity, IBaseMinimalEntity } from "../../common/base-entities";
import { IFileEntity } from "../../files/admin/file";
import { IFile } from "../../files/file";
import { ITaxonomyEntity } from "../../taxonomies/admin/taxonomy";
import { IUserEntity } from "../../users/admin/user";

export enum PostVisibilityEnum {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE"
}

export enum PostStatusEnum {
  PUBLISH = "PUBLISH",
  FUTURE = "FUTURE",
  DRAFT = "DRAFT",
  PENDING = "PENDING",
  AUTO_DRAFT = "AUTO_DRAFT",
  INHERIT = "INHERIT",
  ARCHIVE = "ARCHIVE"
}

export enum PostTypeEnum {
  BLOG = "BLOG",
  PAGE = "PAGE",
  NEWS = "NEWS",
  BANNER = "BANNER",
  EMAIL_TEMPLATE = "EMAIL_TEMPLATE",
  NEWSLETTER_HEADER_TEMPLATE = "NEWSLETTER_HEADER_TEMPLATE",
  NEWSLETTER_BODY_TEMPLATE = "NEWSLETTER_BODY_TEMPLATE",
  NEWSLETTER_FOOTER_TEMPLATE = "NEWSLETTER_FOOTER_TEMPLATE",
}

export enum PostErrorsEnum {
  DUPLICATE_POST = 'Duplicate Post',
  DUPLICATE_SLUG = 'Duplicate Slug',
}

export enum PostErrorsInternalCodeEnum {
  DUPLICATE_POST = 4001,
  DUPLICATE_SLUG = 4002,
}

export interface IPostEntity extends IBaseEntity {
  title: string;
  subtitle: string | null;
  excerpt: string | null;
  content: string | null;
  slug: string;
  featuredImage?: IFileEntity;
  visibility: PostVisibilityEnum;
  status: PostStatusEnum;
  scheduledToPublish: Date | null;
  scheduledToArchive: Date | null;
  commentAllowed?: boolean;
  viewCount?: number;
  type: PostTypeEnum;
  isPinned?: boolean;
  order?: number;
  ancestor?: IPostEntity;
  child?: IPostEntity;
  parent?: IPostEntity;
  taxonomies: ITaxonomyEntity[];
  attachments: IFileEntity[];
  commentsNum: number;
  likes: IUserEntity[];
  likesNum: number;
  bookmarks: IUserEntity[];
  bookmarksNum: number;
  slugsHistory: IPostSlugsHistoryEntity[];
  storeOldSlugToRedirect?: boolean;
}

export interface IPostSlugsHistoryEntity extends IBaseMinimalEntity {
  slug: string;
  post: IPostEntity;
}

export class PostFormValues implements Partial<IPostEntity> {
  @Expose() title?: string = '';
  @Expose() subtitle?: string = '';
  @Expose() excerpt?: string = '';
  @Expose() content?: string = '';
  @Expose() slug?: string = '';
  @Expose() featuredImageId?: string = '';
  @Expose() visibility: PostVisibilityEnum = PostVisibilityEnum.PUBLIC;
  @Expose() status: PostStatusEnum = PostStatusEnum.PUBLISH;
  @Expose() scheduledToPublish?: Date = undefined;
  @Expose() scheduledToArchive?: Date = undefined;
  @Expose() commentAllowed?: boolean | undefined = true;
  @Expose() type: PostTypeEnum = PostTypeEnum.BLOG;
  @Expose() isPinned?: boolean | undefined = false;
  @Expose() order?: number | undefined = 0;
  @Expose() parentId?: string = '';
  @Expose() taxonomiesIds: string[] = [];
  @Expose() attachmentsIds: string[] = [];
  @Expose() slugsHistory: IPostSlugsHistoryEntity[] = [];
  @Expose() storeOldSlugToRedirect?: boolean = true;

  constructor ( init?: PostFormValues | IPostEntity ) {
    plainToClassFromExist(
      this,
      init,
      { excludeExtraneousValues: true }
    );
  }
}