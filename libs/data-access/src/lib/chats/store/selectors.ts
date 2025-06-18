import { createSelector } from '@ngrx/store';
import { chatsFeature } from './store';

export const selectChatLastMessages = createSelector(
  chatsFeature.selectLastMessageChatMap,
  (state) => {
    return Object.values(state);
  }
);
