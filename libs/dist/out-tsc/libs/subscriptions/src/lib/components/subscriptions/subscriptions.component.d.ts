import { Profile } from '@tt/interfaces/profile';
import { SubscriptionsService } from '@tt/data-access';
export declare class SubscriptionsComponent {
    subscriptionsService: SubscriptionsService;
    profile: import("@angular/core").InputSignal<Profile>;
    subscriptionsNumber$: import("rxjs").Observable<number>;
    subscriptions$: import("rxjs").Observable<Profile[]>;
}
//# sourceMappingURL=subscriptions.component.d.ts.map