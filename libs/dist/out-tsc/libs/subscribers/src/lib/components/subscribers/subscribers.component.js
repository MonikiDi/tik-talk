import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, inject, input, } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ImgUrlPipe } from '@tt/common-ui';
import { SubscriberService } from '@tt/data-access';
const SUBSCRIBER_COUNTER = 10;
let SubscribersComponent = class SubscribersComponent {
    subcriberService = inject(SubscriberService);
    subscribers$ = this.subcriberService.getSubscribersShortList(SUBSCRIBER_COUNTER);
    profile = input.required();
};
SubscribersComponent = __decorate([
    Component({
        selector: 'app-subscribers',
        standalone: true,
        imports: [AsyncPipe, ImgUrlPipe, RouterLink],
        templateUrl: './subscribers.component.html',
        styleUrl: './subscribers.component.scss',
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
], SubscribersComponent);
export { SubscribersComponent };
//# sourceMappingURL=subscribers.component.js.map