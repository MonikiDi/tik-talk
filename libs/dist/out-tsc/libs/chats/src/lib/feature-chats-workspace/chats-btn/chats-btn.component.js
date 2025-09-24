import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AvatarCircleComponent } from '@tt/common-ui';
import { DataCreateAtPipe } from '@tt/shared';
let ChatsBtnComponent = class ChatsBtnComponent {
    chat = input();
};
ChatsBtnComponent = __decorate([
    Component({
        selector: 'button[chats]',
        standalone: true,
        imports: [AvatarCircleComponent, DataCreateAtPipe],
        templateUrl: './chats-btn.component.html',
        styleUrl: './chats-btn.component.scss',
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
], ChatsBtnComponent);
export { ChatsBtnComponent };
//# sourceMappingURL=chats-btn.component.js.map