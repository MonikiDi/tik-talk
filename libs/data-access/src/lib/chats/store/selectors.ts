import { createSelector } from '@ngrx/store';
import { chatsFeature } from './reducers';

export const selectChatState = createSelector(
  chatsFeature.selectChatsFeatureState,
  (state) => {
    return state;
  }
);
