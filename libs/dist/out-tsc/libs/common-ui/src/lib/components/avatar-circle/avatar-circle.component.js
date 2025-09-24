import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ImgUrlPipe } from '../../pipes';
let AvatarCircleComponent = class AvatarCircleComponent {
    avatarUrl = input();
};
AvatarCircleComponent = __decorate([
    Component({
        selector: 'app-avatar-circle',
        standalone: true,
        imports: [ImgUrlPipe],
        templateUrl: './avatar-circle.component.html',
        styleUrl: './avatar-circle.component.scss',
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
], AvatarCircleComponent);
export { AvatarCircleComponent };
//# sourceMappingURL=avatar-circle.component.js.map