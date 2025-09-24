import { Message } from '@tt/interfaces/chats/chats.interface';
import { Profile } from '@tt/interfaces/profile';
export declare class ChatWorkspaceMessagesComponent {
    readonly message: import("@angular/core").InputSignal<Message>;
    readonly user: import("@angular/core").InputSignal<Profile>;
    readonly isMyMessage: import("@angular/core").InputSignal<boolean>;
    get isMine(): boolean;
}
//# sourceMappingURL=chat-workspace-messages.component.d.ts.map