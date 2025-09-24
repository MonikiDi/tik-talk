export declare const selectProfileMe: import("@ngrx/store").MemoizedSelector<Record<string, any>, import("@tt/interfaces/profile").Profile | undefined, (s1: import("@tt/interfaces/profile").Profile | undefined) => import("@tt/interfaces/profile").Profile | undefined>;
export declare const selectUser: import("@ngrx/store").MemoizedSelector<Record<string, any>, import("@tt/interfaces/profile").Profile | undefined, (s1: import("@tt/interfaces/profile").Profile | undefined) => import("@tt/interfaces/profile").Profile | undefined>;
export declare const selectProfiles: import("@ngrx/store").MemoizedSelector<Record<string, any>, import("@tt/interfaces/profile").Profile[], (s1: import("@tt/interfaces/profile").Profile[]) => import("@tt/interfaces/profile").Profile[]>;
export declare const selectFilteredProfiles: import("@ngrx/store").MemoizedSelector<Record<string, any>, Partial<import("@tt/interfaces/profile").QueryParamsProfile>, (s1: Partial<import("@tt/interfaces/profile").QueryParamsProfile>) => Partial<import("@tt/interfaces/profile").QueryParamsProfile>>;
export declare const selectPaginationProfiles: import("@ngrx/store").MemoizedSelector<Record<string, any>, {
    currentPage: number;
    perPage: number;
    totalPages: number;
    total: number;
}, (s1: {
    currentPage: number;
    perPage: number;
    totalPages: number;
    total: number;
}) => {
    currentPage: number;
    perPage: number;
    totalPages: number;
    total: number;
}>;
export declare const selectLoadingProfiles: import("@ngrx/store").MemoizedSelector<Record<string, any>, boolean, (s1: boolean) => boolean>;
export declare const selectPagination: import("@ngrx/store").MemoizedSelector<Record<string, any>, {
    currentPage: number;
    perPage: number;
    totalPages: number;
    total: number;
}, (s1: {
    currentPage: number;
    perPage: number;
    totalPages: number;
    total: number;
}) => {
    currentPage: number;
    perPage: number;
    totalPages: number;
    total: number;
}>;
//# sourceMappingURL=selectors.d.ts.map