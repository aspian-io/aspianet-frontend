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

export interface IPostEntity extends IBaseEntity {
  title: string;
  subtitle: string | null;
  excerpt: string | null;
  content: string | null;
  slug: string;
  featuredImage?: IFile;
  visibility: PostVisibilityEnum;
  status: PostStatusEnum;
  scheduledToPublish: Date | null;
  scheduledToArchive: Date | null;
  commentAllowed?: Boolean;
  viewCount?: number;
  type: PostTypeEnum;
  isPinned?: Boolean;
  order?: number;
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
}

export interface IPostSlugsHistoryEntity extends IBaseMinimalEntity {
  slug: string;
  post: IPostEntity;
}

export class PostCreateFormValues implements Partial<IPostEntity> {
  @Expose() @Transform( v => v.value ?? '' ) title?: string;
  @Expose() @Transform( v => v.value ?? '' ) subtitle?: string;
  @Expose() @Transform( v => v.value ?? '' ) excerpt?: string;
  @Expose() @Transform( v => v.value ?? '' ) content?: string;
  @Expose() @Transform( v => v.value ?? '' ) slug?: string;
  @Expose() @Transform( v => v.value ?? undefined ) featuredImageId?: string = undefined;
  @Expose() visibility: PostVisibilityEnum = PostVisibilityEnum.PUBLIC;
  @Expose() status: PostStatusEnum = PostStatusEnum.PUBLISH;
  @Expose() scheduledToPublish?: Date = undefined;
  @Expose() scheduledToArchive?: Date = undefined;
  @Expose() @Transform( v => v.value ?? undefined ) commentAllowed?: Boolean | undefined;
  @Expose() type: PostTypeEnum = PostTypeEnum.BLOG;
  @Expose() isPinned?: Boolean | undefined = false;
  @Expose() @Transform( v => v.value ?? undefined ) order?: number | undefined;
  @Expose() @Transform( v => v.value ?? undefined ) parentId?: string;
  @Expose() taxonomiesIds: string[] = [];
  @Expose() attachmentsIds: string[] = [];

  constructor ( init?: PostCreateFormValues ) {
    plainToClassFromExist(
      this,
      init,
      { excludeExtraneousValues: true }
    );
  }
}

export class PostEditFormValues implements Partial<IPostEntity> {
  @Expose() @Transform( v => v.value ?? '' ) title?: string;
  @Expose() @Transform( v => v.value ?? '' ) subtitle?: string;
  @Expose() @Transform( v => v.value ?? '' ) excerpt?: string;
  @Expose() @Transform( v => v.value ?? '' ) content?: string;
  @Expose() @Transform( v => v.value ?? '' ) slug?: string;
  @Expose() @Transform( v => v.value ?? undefined ) featuredImageId?: string = undefined;
  @Expose() visibility: PostVisibilityEnum = PostVisibilityEnum.PUBLIC;
  @Expose() status: PostStatusEnum = PostStatusEnum.PUBLISH;
  @Expose() scheduledToPublish?: Date = undefined;
  @Expose() scheduledToArchive?: Date = undefined;
  @Expose() @Transform( v => v.value ?? undefined ) commentAllowed?: Boolean | undefined;
  @Expose() isPinned?: Boolean | undefined = false;
  @Expose() @Transform( v => v.value ?? undefined ) order?: number | undefined;
  @Expose() @Transform( v => v.value ?? undefined ) parentId?: string;
  @Expose() taxonomiesIds: string[] = [];
  @Expose() attachmentsIds: string[] = [];

  constructor ( init?: IPostEntity ) {
    plainToClassFromExist(
      this,
      init,
      { excludeExtraneousValues: true }
    );
  }
}