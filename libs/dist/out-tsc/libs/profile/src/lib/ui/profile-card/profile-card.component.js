import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, inject, Input, } from '@angular/core';
import { ImgUrlPipe } from '@tt/common-ui';
import { SubscriberService } from '@tt/data-access';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
let ProfileCardComponent = class ProfileCardComponent {
    subscriberService = inject(SubscriberService);
    profile;
    disabled = true;
    isActive = true;
    toggleSubscriber(event, profileId) {
        event.stopPropagation();
        this.isActive = !this.isActive;
        if (this.isActive) {
            this.onSubscriber(profileId);
        }
        else {
            this.onUnsubscribe(profileId);
        }
    }
    onSubscriber(profileId) {
        this.subscriberService.onSubscriber(profileId).subscribe();
    }
    onUnsubscribe(profileId) {
        this.subscriberService.onUnsubscribe(profileId).subscribe();
    }
};
__decorate([
    Input()
], ProfileCardComponent.prototype, "profile", void 0);
__decorate([
    Input()
], ProfileCardComponent.prototype, "disabled", void 0);
ProfileCardComponent = __decorate([
    Component({
        selector: 'app-profile-card',
        standalone: true,
        imports: [ImgUrlPipe, NgClass, RouterLink],
        templateUrl: './profile-card.component.html',
        styleUrl: './profile-card.component.scss',
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
], ProfileCardComponent);
export { ProfileCardComponent };
//# sourceMappingURL=profile-card.component.js.map