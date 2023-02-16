import { IFile } from "../files/file";
import { ITaxonomy } from "../taxonomies/taxonomy";
import { IMinimalUser } from "../users/minimal-user";
import { PostTypeEnum } from "./admin/post";

export interface IPost {
  id: string;
  title: string;
  subtitle: string | null;
  excerpt: string | null;
  content: string | null;
  slug: string;
  featuredImage?: IFile;
  commentAllowed: boolean;
  viewCount?: number;
  isPinned?: boolean;
  order?: number;
  ancestor?: IPost;
  child?: IPost;
  parent?: IPost;
  taxonomies: ITaxonomy[];
  attachments: IFile[];
  commentsNum: number;
  likes: string[];
  likesNum: number;
  bookmarks: string[];
  bookmarksNum: number;
  createdBy: IMinimalUser;
  projectOwner?: IMinimalUser;
}

export interface IMiniPost {
  id: string;
  type: PostTypeEnum;
  title: string;
  subtitle: string | null;
  excerpt: string | null;
  slug: string;
  featuredImage?: IFile;
  commentAllowed?: boolean;
  viewCount?: number;
  isPinned?: boolean;
  order?: number;
  ancestor?: IMiniPost;
  child?: IMiniPost;
  parent?: IMiniPost;
  taxonomies: ITaxonomy[];
  attachments: IFile[];
  commentsNum: number;
  likes: number;
  likesNum: number;
  bookmarks: number;
  bookmarksNum: number;
  createdBy: IMinimalUser;
}

export interface IPostStat {
  id: string;
  title: string;
  slug: string;
  viewCount?: number;
  commentsNum: number;
  likesNum: number;
  bookmarksNum: number;
  createdAt: Date;
  updatedAt: Date;
}