import { createFeature } from '@ngrx/store';
import { Chat, LastMessageRes } from '@tt/interfaces/chats';
import { reducer } from './reducers';

export type ChatMap = Record<string, Chat>;
export type LastMessageChatMap = Record<string, LastMessageRes>;

export interface ChatState {
  activeChatId: string | null;
  chatMap: ChatMap;
  lastMessageChatMap: LastMessageChatMap;
  unread: number;
}

export const chatsFeature = createFeature({
  name: 'chatsFeature',
  reducer: reducer,
});
