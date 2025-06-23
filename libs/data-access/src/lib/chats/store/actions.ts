import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Chat, LastMessageRes } from '@tt/interfaces/chats';

export const chatsActions = createActionGroup({
  source: 'chats',
  events: {
    'load getChatById': props<{ chatId: number }>(),
    'loaded getChatById': props<{ chats: Chat }>(),
    'load lastMessageChatMap': emptyProps(),
    'loaded lastMessageChatMap': props<{ chats: LastMessageRes[] }>(),
  },
});
