import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ImgUrlPipe } from '@tt/common-ui';
import { RouterLink } from '@angular/router';
let SubscriberCardComponent = class SubscriberCardComponent {
    profile;
};
__decorate([
    Input()
], SubscriberCardComponent.prototype, "profile", void 0);
SubscriberCardComponent = __decorate([
    Component({
        selector: 'app-subscriber-card',
        standalone: true,
        imports: [ImgUrlPipe, RouterLink],
        templateUrl: './subscriber-card.component.html',
        styleUrl: './subscriber-card.component.scss',
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
], SubscriberCardComponent);
export { SubscriberCardComponent };
//# sourceMappingURL=subscriber-card.component.js.map