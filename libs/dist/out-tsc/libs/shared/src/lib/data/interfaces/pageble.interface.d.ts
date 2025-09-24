export interface Pageble<T> extends PaginationResponce {
    items: T[];
}
export interface PaginationResponce {
    total: number;
    page: number;
    size: number;
    pages: number;
}
export interface Pagination {
    total: number;
    currentPage: number;
    perPage: number;
    totalPages: number;
}
//# sourceMappingURL=pageble.interface.d.ts.map