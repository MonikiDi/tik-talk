import { createReducer, on } from '@ngrx/store';
import { chatsActions } from './actions';
import { ChatState, LastMessageChatMap } from './store';

const initialState: ChatState = {
  activeChatId: null,
  chatMap: {},
  lastMessageChatMap: {},
  unread: 0,
};

export const reducer = createReducer(
  initialState,
  on(chatsActions.loadedChats, (state, payload) => {
    return {
      ...state,
      lastMessageChatMap: payload.chats.reduce(
        (acc, item) => ({ ...acc, [item.id]: item }),
        {} as LastMessageChatMap
      ),
    };
  })
);
