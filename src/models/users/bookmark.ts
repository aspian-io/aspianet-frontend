import { IFile } from "../files/file";
import { ITaxonomy } from "../taxonomies/taxonomy";
import { IMinimalUser } from "./minimal-user";

export interface IBookmarkPost {
  title: string;
  subtitle?: string;
  excerpt?: string;
  content?: string;
  slug: string;
  viewCount: number;
  comments: number;
  likes: number;
  bookmarks: number;
  featuredImage?: IFile;
  createdBy: IMinimalUser;
  taxonomies: ITaxonomy[];
}