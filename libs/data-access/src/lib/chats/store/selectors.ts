import { createSelector } from '@ngrx/store';
import { chatsFeature } from './store';

export const selectActiveChat = createSelector(
  chatsFeature['selectActiveChatId'],
  chatsFeature['selectChatMap'],
  (activeChatId, chatMap) => {
    return activeChatId ? chatMap[activeChatId] : undefined;
  }
);
export const selectLastMessageChatMap = createSelector(
  chatsFeature['selectLastMessageChatMap'],
  (state) => {
    return Object.values(state);
  }
);
export const selectActiveChatId = createSelector(
  chatsFeature['selectActiveChatId'],
  (activeChatId) => {
    return activeChatId;
  }
);

export const getChatBuId = (chatId: string) => {
  return createSelector(chatsFeature['selectChatMap'], (chatMap) => {
    return chatMap[chatId];
  });
};
export const getLastMessageId = (chatId: string) => {
  return createSelector(
    chatsFeature['selectLastMessageChatMap'],
    (lastMessageChatMap) => {
      return lastMessageChatMap[chatId];
    }
  );
};
export const selectUnread = createSelector(
  chatsFeature['selectUnread'],
  (unread) => {
    return unread;
  }
);
export const hasLastMessageById = (chatId: string) => {
  return createSelector(
    chatsFeature['selectLastMessageChatMap'],
    (lastMessageChatMap) => {
      return Boolean(lastMessageChatMap[chatId]);
    }
  );
};
