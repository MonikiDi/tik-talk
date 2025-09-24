import { HttpClient } from '@angular/common/http';
import { Profile } from '@tt/interfaces/profile';
export declare class SubscriberService {
    http: HttpClient;
    baseApiUrl: string;
    getSubscribersShortList(subsAmount?: number): import("rxjs").Observable<Profile[]>;
    onSubscriber(accountId: number): import("rxjs").Observable<Object>;
    onUnsubscribe(accountId: number): import("rxjs").Observable<Object>;
}
//# sourceMappingURL=subscriber.service.d.ts.map