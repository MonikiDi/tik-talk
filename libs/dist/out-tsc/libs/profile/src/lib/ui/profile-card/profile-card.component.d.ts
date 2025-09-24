import { Profile } from '@tt/interfaces/profile';
import { SubscriberService } from '@tt/data-access';
export declare class ProfileCardComponent {
    subscriberService: SubscriberService;
    profile: Profile;
    disabled: boolean;
    isActive: boolean;
    toggleSubscriber(event: Event, profileId: number): void;
    onSubscriber(profileId: number): void;
    onUnsubscribe(profileId: number): void;
}
//# sourceMappingURL=profile-card.component.d.ts.map