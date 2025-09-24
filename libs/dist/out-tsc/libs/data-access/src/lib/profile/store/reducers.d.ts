import { Profile, QueryParamsProfile } from '@tt/interfaces/profile';
export interface ProfileState {
    profileMe: Profile | undefined;
    userId: string;
    user: Profile | undefined;
    profiles: Profile[];
    profileFilters: Partial<QueryParamsProfile>;
    pagination: {
        currentPage: number;
        perPage: number;
        totalPages: number;
        total: number;
    };
    isLoading: boolean;
}
export declare const profileFeature: {
    name: "profileFeature";
    reducer: import("@ngrx/store").ActionReducer<ProfileState, import("@ngrx/store").Action<string>>;
    selectProfileFeatureState: import("@ngrx/store").MemoizedSelector<Record<string, any>, ProfileState, (featureState: ProfileState) => ProfileState>;
    selectUserId: import("@ngrx/store").MemoizedSelector<Record<string, any>, string, (featureState: ProfileState) => string>;
    selectUser: import("@ngrx/store").MemoizedSelector<Record<string, any>, Profile | undefined, (featureState: ProfileState) => Profile | undefined>;
    selectProfileMe: import("@ngrx/store").MemoizedSelector<Record<string, any>, Profile | undefined, (featureState: ProfileState) => Profile | undefined>;
    selectProfiles: import("@ngrx/store").MemoizedSelector<Record<string, any>, Profile[], (featureState: ProfileState) => Profile[]>;
    selectPagination: import("@ngrx/store").MemoizedSelector<Record<string, any>, {
        currentPage: number;
        perPage: number;
        totalPages: number;
        total: number;
    }, (featureState: ProfileState) => {
        currentPage: number;
        perPage: number;
        totalPages: number;
        total: number;
    }>;
    selectProfileFilters: import("@ngrx/store").MemoizedSelector<Record<string, any>, Partial<QueryParamsProfile>, (featureState: ProfileState) => Partial<QueryParamsProfile>>;
    selectIsLoading: import("@ngrx/store").MemoizedSelector<Record<string, any>, boolean, (featureState: ProfileState) => boolean>;
};
//# sourceMappingURL=reducers.d.ts.map