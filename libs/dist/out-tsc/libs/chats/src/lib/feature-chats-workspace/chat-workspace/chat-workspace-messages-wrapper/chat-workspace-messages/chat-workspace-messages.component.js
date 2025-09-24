import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, HostBinding, input } from '@angular/core';
import { AvatarCircleComponent } from '@tt/common-ui';
import { DateUtcPipe } from '@tt/shared';
import { DatePipe } from '@angular/common';
let ChatWorkspaceMessagesComponent = class ChatWorkspaceMessagesComponent {
    message = input.required();
    user = input.required();
    isMyMessage = input.required();
    get isMine() {
        return this.isMyMessage();
    }
};
__decorate([
    HostBinding('class.is-mine')
], ChatWorkspaceMessagesComponent.prototype, "isMine", null);
ChatWorkspaceMessagesComponent = __decorate([
    Component({
        selector: 'app-chat-workspace-messages',
        standalone: true,
        imports: [AvatarCircleComponent, DatePipe, DateUtcPipe],
        templateUrl: './chat-workspace-messages.component.html',
        styleUrl: './chat-workspace-messages.component.scss',
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], ChatWorkspaceMessagesComponent);
export { ChatWorkspaceMessagesComponent };
//# sourceMappingURL=chat-workspace-messages.component.js.map