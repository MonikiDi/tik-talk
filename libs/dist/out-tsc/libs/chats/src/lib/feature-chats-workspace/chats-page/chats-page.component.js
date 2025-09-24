import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatsListComponent } from '../chats-list/chats-list.component';
let ChatsPageComponent = class ChatsPageComponent {
};
ChatsPageComponent = __decorate([
    Component({
        selector: 'app-chats-page',
        standalone: true,
        imports: [RouterOutlet, ChatsListComponent],
        templateUrl: './chats-page.component.html',
        styleUrl: './chats-page.component.scss',
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
], ChatsPageComponent);
export { ChatsPageComponent };
//# sourceMappingURL=chats-page.component.js.map