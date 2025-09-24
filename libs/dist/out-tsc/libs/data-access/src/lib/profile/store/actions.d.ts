import { Profile, QueryParamsProfile } from '@tt/interfaces/profile';
import { Pageble, Pagination } from '@tt/shared';
export declare const profileActions: {
    loadGetMe: import("@ngrx/store").ActionCreator<"[profile] Load get me", () => import("@ngrx/store").Action<"[profile] Load get me">>;
    loadedGetMe: import("@ngrx/store").ActionCreator<"[profile] Loaded get me", (props: {
        profileMe: Profile;
    }) => {
        profileMe: Profile;
    } & import("@ngrx/store").Action<"[profile] Loaded get me">>;
    loadPatchMe: import("@ngrx/store").ActionCreator<"[profile] Load patch me", (props: Partial<Profile>) => Partial<Profile> & import("@ngrx/store").Action<"[profile] Load patch me">>;
    loadPatchAvatarMe: import("@ngrx/store").ActionCreator<"[profile] Load patch avatar me", (props: {
        file: File;
    }) => {
        file: File;
    } & import("@ngrx/store").Action<"[profile] Load patch avatar me">>;
    loadedPatchAvatarMe: import("@ngrx/store").ActionCreator<"[profile] Loaded patch avatar me", (props: Profile) => Profile & import("@ngrx/store").Action<"[profile] Loaded patch avatar me">>;
    loadedPatchMe: import("@ngrx/store").ActionCreator<"[profile] Loaded patch me", (props: Profile) => Profile & import("@ngrx/store").Action<"[profile] Loaded patch me">>;
    loadUserId: import("@ngrx/store").ActionCreator<"[profile] Load user id", (props: {
        userId: string;
    }) => {
        userId: string;
    } & import("@ngrx/store").Action<"[profile] Load user id">>;
    loadedUser: import("@ngrx/store").ActionCreator<"[profile] Loaded user", (props: {
        user: Profile;
    }) => {
        user: Profile;
    } & import("@ngrx/store").Action<"[profile] Loaded user">>;
    filterEvents: import("@ngrx/store").ActionCreator<"[profile] filter events", (props: Partial<QueryParamsProfile>) => Partial<QueryParamsProfile> & import("@ngrx/store").Action<"[profile] filter events">>;
    paginationProfiles: import("@ngrx/store").ActionCreator<"[profile] pagination profiles", (props: {
        currentPage: number;
        perPage?: number | undefined;
        isScroll?: boolean | undefined;
    }) => {
        currentPage: number;
        perPage?: number | undefined;
        isScroll?: boolean | undefined;
    } & import("@ngrx/store").Action<"[profile] pagination profiles">>;
    paginationSet: import("@ngrx/store").ActionCreator<"[profile] pagination set", (props: Pagination) => Pagination & import("@ngrx/store").Action<"[profile] pagination set">>;
    profilesLoaded: import("@ngrx/store").ActionCreator<"[profile] profiles loaded", (props: {
        profiles: Profile[];
    }) => {
        profiles: Profile[];
    } & import("@ngrx/store").Action<"[profile] profiles loaded">>;
    loadingStartProfiles: import("@ngrx/store").ActionCreator<"[profile] Loading start profiles", () => import("@ngrx/store").Action<"[profile] Loading start profiles">>;
    loadingEndProfiles: import("@ngrx/store").ActionCreator<"[profile] Loading end profiles", () => import("@ngrx/store").Action<"[profile] Loading end profiles">>;
    loadProfiles: import("@ngrx/store").ActionCreator<"[profile] Load Profiles", (props: {
        filters: Partial<QueryParamsProfile>;
        pagination: {
            currentPage: number;
            perPage?: number;
            isScroll?: boolean;
        };
    }) => {
        filters: Partial<QueryParamsProfile>;
        pagination: {
            currentPage: number;
            perPage?: number;
            isScroll?: boolean;
        };
    } & import("@ngrx/store").Action<"[profile] Load Profiles">>;
    loadedInfiniteProfiles: import("@ngrx/store").ActionCreator<"[profile] Loaded Infinite Profiles", (props: Pageble<Profile>) => Pageble<Profile> & import("@ngrx/store").Action<"[profile] Loaded Infinite Profiles">>;
    loadedPaginationProfiles: import("@ngrx/store").ActionCreator<"[profile] Loaded Pagination Profiles", (props: Pageble<Profile>) => Pageble<Profile> & import("@ngrx/store").Action<"[profile] Loaded Pagination Profiles">>;
    deleteStoreProfiles: import("@ngrx/store").ActionCreator<"[profile] Delete Store Profiles", () => import("@ngrx/store").Action<"[profile] Delete Store Profiles">>;
};
//# sourceMappingURL=actions.d.ts.map