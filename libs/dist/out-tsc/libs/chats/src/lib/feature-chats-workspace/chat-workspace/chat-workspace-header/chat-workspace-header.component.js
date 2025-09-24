import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AvatarCircleComponent } from '@tt/common-ui';
import { SvgIconComponent } from '@tt/common-ui';
import { RouterLink } from '@angular/router';
let ChatWorkspaceHeaderComponent = class ChatWorkspaceHeaderComponent {
    profile = input.required();
};
ChatWorkspaceHeaderComponent = __decorate([
    Component({
        selector: 'app-chat-workspace-header',
        standalone: true,
        imports: [AvatarCircleComponent, SvgIconComponent, RouterLink],
        templateUrl: './chat-workspace-header.component.html',
        styleUrl: './chat-workspace-header.component.scss',
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
], ChatWorkspaceHeaderComponent);
export { ChatWorkspaceHeaderComponent };
//# sourceMappingURL=chat-workspace-header.component.js.map