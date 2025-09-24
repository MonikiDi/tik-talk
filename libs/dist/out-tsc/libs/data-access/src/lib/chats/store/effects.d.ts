import { Actions } from '@ngrx/effects';
export declare class ChatEffects {
    actions$: Actions<any>;
    private readonly chatsService;
    private readonly profileService;
    getMyChatById$: import("rxjs").Observable<{
        chats: import("@tt/interfaces/chats").Chat;
    } & import("@ngrx/store").Action<"[chats] loaded getChatById">> & import("@ngrx/effects").CreateEffectMetadata;
    getlastMesageChat$: import("rxjs").Observable<{
        chats: import("@tt/interfaces/chats").LastMessageRes[];
    } & import("@ngrx/store").Action<"[chats] loaded lastMessageChatMap">> & import("@ngrx/effects").CreateEffectMetadata;
    addLastMessageChat$: import("rxjs").Observable<{
        chatId: string;
        message: import("@tt/interfaces/chats").LastMessageRes;
    } & import("@ngrx/store").Action<"[chats] add lastMessageChat">> & import("@ngrx/effects").CreateEffectMetadata;
}
//# sourceMappingURL=effects.d.ts.map