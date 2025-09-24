import { HttpClient } from '@angular/common/http';
import { Pageble } from '@tt/shared';
import { Profile, QueryParamsProfile } from '@tt/interfaces/profile';
import { Store } from '@ngrx/store';
export declare class ProfileService {
    http: HttpClient;
    baseApiUrl: string;
    store: Store<any>;
    getMe(): import("rxjs").Observable<Profile>;
    getAccount(id: string): import("rxjs").Observable<Profile>;
    patchProfile(profile: Partial<Profile>): import("rxjs").Observable<Profile>;
    uploadAvatar(file: File): import("rxjs").Observable<Profile>;
    query(params?: Partial<QueryParamsProfile>, pagination?: {
        page: number;
        perPage: number;
    }): import("rxjs").Observable<Pageble<Profile>>;
}
//# sourceMappingURL=profile.service.d.ts.map