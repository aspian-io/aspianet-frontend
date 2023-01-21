import { IUserAuth } from "../auth/auth";
import { IFile } from "../files/file";
import { ITaxonomy } from "../taxonomies/taxonomy";

export interface IPost {
  title: string;
  subtitle: string | null;
  excerpt: string | null;
  content: string | null;
  slug: string;
  featuredImage?: IFile;
  commentAllowed?: boolean;
  viewCount?: number;
  isPinned?: boolean;
  order?: number;
  ancestor?: IPost;
  child?: IPost;
  parent?: IPost;
  taxonomies: ITaxonomy[];
  attachments: IFile[];
  commentsNum: number;
  likes: number;
  bookmarks: number;
  createdBy: IUserAuth;
}