import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Chat, LastMessageRes, Message } from '@tt/interfaces/chats';
import { ChatWSNewMessage } from '@tt/interfaces/chats/chat-ws-message.interface';

export const chatsActions = createActionGroup({
  source: 'chats',
  events: {
    'load getChatById': props<{ chatId: number }>(),
    'loaded getChatById': props<{ chats: Chat }>(),
    'load lastMessageChatMap': emptyProps(),
    'loaded lastMessageChatMap': props<{ chats: LastMessageRes[] }>(),
    'set activeChatId': props<{ chatId: string }>(),
    'add message chat': props<{ chatId: string; message: Message }>(),
    'upsert lastMessageChat': props<{
      chatId: string;
      message: Partial<LastMessageRes>;
    }>(),
    'add lastMessageChat': props<{ chatId: string; message: LastMessageRes }>(),
    'get Profile Id': props<{ profileId: string; message: ChatWSNewMessage }>(),
  },
});
