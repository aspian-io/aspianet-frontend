import { IFile } from "../files/file";
import { TaxonomyTypeEnum } from "./admin/taxonomy";

export interface ITaxonomy {
  id: string;
  href?: string;
  order?: number;
  parent?: ITaxonomy;
  children?: ITaxonomy[];
  childLevel?: number;
  term: string;
  description?: string;
  slug: string;
  featuredImage?: IFile;
  type: TaxonomyTypeEnum;
}