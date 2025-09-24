import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AvatarCircleComponent } from '@tt/common-ui';
let ProfileHeaderComponent = class ProfileHeaderComponent {
    profile = input();
};
ProfileHeaderComponent = __decorate([
    Component({
        selector: 'app-profile-header',
        standalone: true,
        imports: [AvatarCircleComponent],
        templateUrl: './profile-header.component.html',
        styleUrl: './profile-header.component.scss',
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
], ProfileHeaderComponent);
export { ProfileHeaderComponent };
//# sourceMappingURL=profile-header.component.js.map