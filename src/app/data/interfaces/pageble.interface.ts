export interface Pageble<T> extends PaginationResponce {
  items: T[];
}

export interface PaginationResponce {
  total: number;
  page: number;
  size: number;
  pages: number;
}
