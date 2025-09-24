import { Chat, LastMessageRes } from '@tt/interfaces/chats';
export type ChatMap = Record<string, Chat>;
export type LastMessageChatMap = Record<string, LastMessageRes>;
export interface ChatState {
    activeChatId: string | null;
    chatMap: ChatMap;
    lastMessageChatMap: LastMessageChatMap;
    unread: number;
}
export declare const chatsFeature: {
    name: "chatsFeature";
    reducer: import("@ngrx/store").ActionReducer<ChatState, import("@ngrx/store").Action<string>>;
    selectChatsFeatureState: import("@ngrx/store").MemoizedSelector<Record<string, any>, ChatState, (featureState: ChatState) => ChatState>;
    selectUnread: import("@ngrx/store").MemoizedSelector<Record<string, any>, number, (featureState: ChatState) => number>;
    selectLastMessageChatMap: import("@ngrx/store").MemoizedSelector<Record<string, any>, LastMessageChatMap, (featureState: ChatState) => LastMessageChatMap>;
    selectActiveChatId: import("@ngrx/store").MemoizedSelector<Record<string, any>, string | null, (featureState: ChatState) => string | null>;
    selectChatMap: import("@ngrx/store").MemoizedSelector<Record<string, any>, ChatMap, (featureState: ChatState) => ChatMap>;
};
//# sourceMappingURL=store.d.ts.map