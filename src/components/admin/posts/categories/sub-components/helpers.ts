import { ITaxonomyEntity } from "../../../../../models/taxonomies/admin/taxonomy";

// Get category by its id from data source
export function getCategoryById(
  id: string,
  dataSource: ITaxonomyEntity[]
): ITaxonomyEntity | undefined {
  if (dataSource) {
    const category = dataSource.filter((c) => c.id === id)[0];
    if (category && category.term) {
      return category;
    }

    const result: (ITaxonomyEntity | undefined)[] = dataSource.map((c) => {
      if (c.children && c.children.length > 0) {
        const deepResult = getCategoryById(id, c.children);
        if (deepResult) {
          return deepResult;
        }
      }
    });

    if (result && result.length > 0)
      return result.filter((r) => r !== undefined)[0];
  }
}