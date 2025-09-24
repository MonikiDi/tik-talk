import { AfterViewInit } from '@angular/core';
import { Chat } from '@tt/interfaces/chats/chats.interface';
import { Profile } from '@tt/interfaces/profile';
export declare class ChatWorkspaceMessagesWrapperComponent implements AfterViewInit {
    private readonly hostElement;
    private readonly chatsService;
    private readonly r2;
    readonly chat: import("@angular/core").InputSignal<Chat>;
    readonly profileMe: import("@angular/core").InputSignal<Profile>;
    readonly filterDayMessages: import("@angular/core").Signal<import("@tt/shared").FilterMessages[]>;
    readonly parentData: import("@angular/core").WritableSignal<string>;
    constructor();
    scrollToBottom(): void;
    ngAfterViewInit(): void;
    onWindowResize(): void;
    resizeFeed(): void;
    onSendMessage(messageText: string): Promise<void>;
}
//# sourceMappingURL=chat-workspace-messages-wrapper.component.d.ts.map