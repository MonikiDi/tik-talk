import { Actions } from '@ngrx/effects';
import { ProfileService } from '../services/profile.service';
export declare class ProfileEffects {
    profileService: ProfileService;
    actions$: Actions<any>;
    private readonly store;
    loadProfileMe: import("rxjs").Observable<{
        profileMe: import("@tt/interfaces/profile").Profile;
    } & import("@ngrx/store").Action<"[profile] Loaded get me">> & import("@ngrx/effects").CreateEffectMetadata;
    loadPatchMe: import("rxjs").Observable<import("@tt/interfaces/profile").Profile & import("@ngrx/store").Action<"[profile] Loaded patch me">> & import("@ngrx/effects").CreateEffectMetadata;
    loadPatchAvatarMe: import("rxjs").Observable<import("@tt/interfaces/profile").Profile & import("@ngrx/store").Action<"[profile] Loaded patch avatar me">> & import("@ngrx/effects").CreateEffectMetadata;
    loadUserId: import("rxjs").Observable<{
        user: import("@tt/interfaces/profile").Profile;
    } & import("@ngrx/store").Action<"[profile] Loaded user">> & import("@ngrx/effects").CreateEffectMetadata;
    loadingStartProfiles: import("rxjs").Observable<import("@ngrx/store").Action<"[profile] Loading start profiles">> & import("@ngrx/effects").CreateEffectMetadata;
    loadingEndInfiniteProfiles: import("rxjs").Observable<import("@ngrx/store").Action<"[profile] Loading end profiles">> & import("@ngrx/effects").CreateEffectMetadata;
    loadingEndPaginationProfiles: import("rxjs").Observable<import("@ngrx/store").Action<"[profile] Loading end profiles">> & import("@ngrx/effects").CreateEffectMetadata;
    loadProfile: import("rxjs").Observable<(import("@tt/shared").Pageble<import("@tt/interfaces/profile").Profile> & import("@ngrx/store").Action<"[profile] Loaded Infinite Profiles">) | (import("@tt/shared").Pageble<import("@tt/interfaces/profile").Profile> & import("@ngrx/store").Action<"[profile] Loaded Pagination Profiles">)> & import("@ngrx/effects").CreateEffectMetadata;
    filterProfiles: import("rxjs").Observable<{
        filters: Partial<import("@tt/interfaces/profile").QueryParamsProfile>;
        pagination: {
            currentPage: number;
            perPage?: number | undefined;
            isScroll?: boolean | undefined;
        };
    } & import("@ngrx/store").Action<"[profile] Load Profiles">> & import("@ngrx/effects").CreateEffectMetadata;
    paginationProfiles: import("rxjs").Observable<{
        filters: Partial<import("@tt/interfaces/profile").QueryParamsProfile>;
        pagination: {
            currentPage: number;
            perPage?: number | undefined;
            isScroll?: boolean | undefined;
        };
    } & import("@ngrx/store").Action<"[profile] Load Profiles">> & import("@ngrx/effects").CreateEffectMetadata;
}
//# sourceMappingURL=effects.d.ts.map