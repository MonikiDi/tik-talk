import { Chat, LastMessageRes, Message } from '@tt/interfaces/chats';
import { ChatWSNewMessage } from '@tt/interfaces/chats/chat-ws-message.interface';
export declare const chatsActions: {
    loadGetChatById: import("@ngrx/store").ActionCreator<"[chats] load getChatById", (props: {
        chatId: number;
    }) => {
        chatId: number;
    } & import("@ngrx/store").Action<"[chats] load getChatById">>;
    loadedGetChatById: import("@ngrx/store").ActionCreator<"[chats] loaded getChatById", (props: {
        chats: Chat;
    }) => {
        chats: Chat;
    } & import("@ngrx/store").Action<"[chats] loaded getChatById">>;
    loadLastMessageChatMap: import("@ngrx/store").ActionCreator<"[chats] load lastMessageChatMap", () => import("@ngrx/store").Action<"[chats] load lastMessageChatMap">>;
    loadedLastMessageChatMap: import("@ngrx/store").ActionCreator<"[chats] loaded lastMessageChatMap", (props: {
        chats: LastMessageRes[];
    }) => {
        chats: LastMessageRes[];
    } & import("@ngrx/store").Action<"[chats] loaded lastMessageChatMap">>;
    setActiveChatId: import("@ngrx/store").ActionCreator<"[chats] set activeChatId", (props: {
        chatId: string;
    }) => {
        chatId: string;
    } & import("@ngrx/store").Action<"[chats] set activeChatId">>;
    addMessageChat: import("@ngrx/store").ActionCreator<"[chats] add message chat", (props: {
        chatId: string;
        message: Message;
    }) => {
        chatId: string;
        message: Message;
    } & import("@ngrx/store").Action<"[chats] add message chat">>;
    upsertLastMessageChat: import("@ngrx/store").ActionCreator<"[chats] upsert lastMessageChat", (props: {
        chatId: string;
        message: Partial<LastMessageRes>;
    }) => {
        chatId: string;
        message: Partial<LastMessageRes>;
    } & import("@ngrx/store").Action<"[chats] upsert lastMessageChat">>;
    addLastMessageChat: import("@ngrx/store").ActionCreator<"[chats] add lastMessageChat", (props: {
        chatId: string;
        message: LastMessageRes;
    }) => {
        chatId: string;
        message: LastMessageRes;
    } & import("@ngrx/store").Action<"[chats] add lastMessageChat">>;
    getProfileId: import("@ngrx/store").ActionCreator<"[chats] get Profile Id", (props: {
        profileId: string;
        message: ChatWSNewMessage;
    }) => {
        profileId: string;
        message: ChatWSNewMessage;
    } & import("@ngrx/store").Action<"[chats] get Profile Id">>;
    setUnread: import("@ngrx/store").ActionCreator<"[chats] set unread", (props: {
        unread: number;
    }) => {
        unread: number;
    } & import("@ngrx/store").Action<"[chats] set unread">>;
};
//# sourceMappingURL=actions.d.ts.map