// Sort Type
type ISortType = 'ASC' | 'DESC';

// User List URL Generator Type
export interface IUserListQs {
  page: string;
  limit: string;
  searchByEmail?: string;
  searchByFirstName?: string;
  searchByLastName?: string;
  searchByBio?: string;
  searchByAddress?: string;
  searchByPhone?: string;
  searchByMobilePhone?: string;
  searchByPostalCode?: string;
  filterByClaims?: string[];
  filterBySuspended?: boolean;
  filterByBirthDate?: string[];
  filterByCreatedAt?: string[];
  filterByUpdatedAt?: string[];
  orderByFirstName?: ISortType;
  orderByLastName?: ISortType;
  orderByBio?: ISortType;
  orderByEmail?: ISortType;
  orderByBirthDate?: ISortType;
  orderByCountry?: ISortType;
  orderByState?: ISortType;
  orderByCity?: ISortType;
  orderByAddress?: ISortType;
  orderByPhone?: ISortType;
  orderByMobilePhone?: ISortType;
  orderByPostalCode?: ISortType;
  orderByCreatedAt?: ISortType;
  orderByUpdatedAt?: ISortType;
  orderBySuspend?: ISortType;
  orderByIpAddress?: ISortType;
  orderByUserAgent?: ISortType;
}

export function generateUserListUrlByQs ( qs: IUserListQs ) {
  const pageQs = qs.page && +qs.page > 0 ? `page=${ qs.page }` : '';
}