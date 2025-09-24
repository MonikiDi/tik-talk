import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, inject, input, } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ImgUrlPipe } from '@tt/common-ui';
import { SubscriptionsService } from '@tt/data-access';
const SUBSCRIBER_COUNTER = 100;
let SubscriptionsComponent = class SubscriptionsComponent {
    subscriptionsService = inject(SubscriptionsService);
    profile = input.required();
    subscriptionsNumber$ = this.subscriptionsService.getSubscriptionsNumber();
    subscriptions$ = this.subscriptionsService.getSubscriptionsShortList(SUBSCRIBER_COUNTER);
};
SubscriptionsComponent = __decorate([
    Component({
        selector: 'app-subscriptions',
        standalone: true,
        imports: [AsyncPipe, ImgUrlPipe, RouterLink],
        templateUrl: './subscriptions.component.html',
        styleUrl: './subscriptions.component.scss',
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
], SubscriptionsComponent);
export { SubscriptionsComponent };
//# sourceMappingURL=subscriptions.component.js.map