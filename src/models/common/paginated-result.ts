export interface IPaginated<T> {
  meta: {
    totalPages: number;
    currentPage: number;
    itemCount: number;
    totalItems: number;
    itemsPerPage: number;
  };

  items: T[];
}