import { createReducer, on } from '@ngrx/store';
import { chatsActions } from './actions';
import { ChatState, LastMessageChatMap } from './store';
import { messages } from 'nx/src/utils/ab-testing';
import { state } from '@angular/animations';

const initialState: ChatState = {
  activeChatId: null,
  chatMap: {},
  lastMessageChatMap: {},
  unread: 0,
};

export const reducer = createReducer(
  initialState,
  on(chatsActions.loadedGetChatById, (state, payload) => {
    return {
      ...state,
      chatMap: {
        ...state.chatMap,
        [payload.chats.id]: payload.chats,
      },
    };
  }),
  on(chatsActions.loadedLastMessageChatMap, (state, payload) => {
    return {
      ...state,
      lastMessageChatMap: payload.chats.reduce(
        (acc, item) => ({ ...acc, [item.id]: item }),
        {} as LastMessageChatMap
      ),
    };
  }),
  on(chatsActions.setActiveChatId, (state, payload) => {
    return {
      ...state,
      activeChatId: payload.chatId,
    };
  }),
  on(chatsActions.addMessageChat, (state, payload) => {
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
  }),
  on(chatsActions.upsertLastMessageChat, (state, payload) => {
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
  }),
  on(chatsActions.addLastMessageChat, (state, payload) => {
    return {
      ...state,
      lastMessageChatMap: {
        ...state.lastMessageChatMap,
        [payload.chatId]: payload.message,
      },
    };
  }),
  on(chatsActions.setUnread, (state, payload) => {
    return {
      ...state,
      unread: payload.unread,
    };
  })
);
