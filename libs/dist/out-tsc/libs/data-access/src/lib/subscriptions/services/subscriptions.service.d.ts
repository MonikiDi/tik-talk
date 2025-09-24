import { HttpClient } from '@angular/common/http';
import { Profile } from '@tt/interfaces/profile';
export declare class SubscriptionsService {
    http: HttpClient;
    baseApiUrl: string;
    getSubscriptionsShortList(subsAmount?: number): import("rxjs").Observable<Profile[]>;
    getSubscriptionsNumber(): import("rxjs").Observable<number>;
}
//# sourceMappingURL=subscriptions.service.d.ts.map