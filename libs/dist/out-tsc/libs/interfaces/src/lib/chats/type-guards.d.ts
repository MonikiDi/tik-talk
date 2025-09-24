import { ChatWSErrorMessage, ChatWSMessage, ChatWSNewMessage, ChatWSUnreadMessage } from './chat-ws-message.interface';
export declare function isErrorMessage(message: ChatWSMessage): message is ChatWSErrorMessage;
export declare function isUnreadMessage(message: ChatWSMessage): message is ChatWSUnreadMessage;
export declare function isNewMessage(message: ChatWSMessage): message is ChatWSNewMessage;
//# sourceMappingURL=type-guards.d.ts.map