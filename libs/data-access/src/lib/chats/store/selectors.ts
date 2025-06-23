import { createSelector } from '@ngrx/store';
import { chatsFeature } from './store';

export const selectActiveChat = createSelector(
  chatsFeature.selectActiveChatId,
  chatsFeature.selectChatMap,
  (activeChatId, chatMap) => {
    return activeChatId ? chatMap[activeChatId] : undefined;
  }
);
export const selectLastMessageChatMap = createSelector(
  chatsFeature.selectLastMessageChatMap,
  (state) => {
    return Object.values(state);
  }
);
