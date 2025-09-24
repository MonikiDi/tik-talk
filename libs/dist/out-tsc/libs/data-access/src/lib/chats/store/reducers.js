import { createReducer, on } from '@ngrx/store';
import { chatsActions } from './actions';
const initialState = {
    activeChatId: null,
    chatMap: {},
    lastMessageChatMap: {},
    unread: 0,
};
export const reducer = createReducer(initialState, on(chatsActions.loadedGetChatById, (state, payload) => {
    return {
        ...state,
        chatMap: {
            ...state.chatMap,
            [payload.chats.id]: payload.chats,
        },
    };
}), on(chatsActions.loadedLastMessageChatMap, (state, payload) => {
    return {
        ...state,
        lastMessageChatMap: payload.chats.reduce((acc, item) => ({ ...acc, [item.id]: item }), {}),
    };
}), on(chatsActions.setActiveChatId, (state, payload) => {
    return {
        ...state,
        activeChatId: payload.chatId,
    };
}), on(chatsActions.addMessageChat, (state, payload) => {
    return {
        ...state,
        chatMap: {
            ...state.chatMap,
            [payload.chatId]: {
                ...state.chatMap[payload.chatId],
                messages: [
                    ...state.chatMap[payload.chatId].messages,
                    payload.message,
                ],
            },
        },
    };
}), on(chatsActions.upsertLastMessageChat, (state, payload) => {
    return {
        ...state,
        lastMessageChatMap: {
            ...state.lastMessageChatMap,
            [payload.chatId]: {
                ...state.lastMessageChatMap[payload.chatId],
                ...payload.message,
            },
        },
    };
}), on(chatsActions.addLastMessageChat, (state, payload) => {
    return {
        ...state,
        lastMessageChatMap: {
            ...state.lastMessageChatMap,
            [payload.chatId]: payload.message,
        },
    };
}), on(chatsActions.setUnread, (state, payload) => {
    return {
        ...state,
        unread: payload.unread,
    };
}));
//# sourceMappingURL=reducers.js.map