import { OnInit, Signal } from '@angular/core';
import { Profile } from '@tt/interfaces/profile';
export declare class ChatWorkspaceComponent implements OnInit {
    private readonly chatsService;
    private readonly route;
    private readonly store;
    private readonly router;
    readonly me: Signal<Profile | undefined>;
    readonly activeChat: Signal<import("@tt/interfaces/chats").Chat | undefined>;
    readonly companion: Signal<Profile | undefined>;
    private readonly chatId$;
    ngOnInit(): void;
}
//# sourceMappingURL=chat-workspace.component.d.ts.map