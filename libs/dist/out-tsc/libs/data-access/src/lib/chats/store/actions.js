import { createActionGroup, emptyProps, props } from '@ngrx/store';
export const chatsActions = createActionGroup({
    source: 'chats',
    events: {
        'load getChatById': props(),
        'loaded getChatById': props(),
        'load lastMessageChatMap': emptyProps(),
        'loaded lastMessageChatMap': props(),
        'set activeChatId': props(),
        'add message chat': props(),
        'upsert lastMessageChat': props(),
        'add lastMessageChat': props(),
        'get Profile Id': props(),
        'set unread': props(),
    },
});
//# sourceMappingURL=actions.js.map