import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LastMessageRes } from '@tt/interfaces/chats';

export const chatsActions = createActionGroup({
  source: 'chats',
  events: {
    'load chats': emptyProps(),
    'loaded chats': props<{ chats: LastMessageRes[] }>(),
  },
});
