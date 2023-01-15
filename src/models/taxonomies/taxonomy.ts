import { IFile } from "../files/file";

export interface ITaxonomy {
  href?: string;
  order?: number;
  parent?: ITaxonomy;
  children?: ITaxonomy[];
  childLevel?: number;
  term: string;
  description?: string;
  slug: string;
  featuredImage?: IFile;
}