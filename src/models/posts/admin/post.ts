import { IBaseEntity, IBaseMinimalEntity } from "../../common/base-entities";
import { IFileEntity } from "../../files/admin/file";
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
  featuredImage?: File;
  visibility: PostVisibilityEnum;
  status: PostStatusEnum;
  scheduledToPublish: Date | null;
  scheduledToArchive: Date | null;
  commentAllowed?: Boolean;
  viewCount?: number;
  type: PostTypeEnum;
  isPinned?: Boolean;
  order?: number;
  child: IPostEntity;
  parent: IPostEntity;
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