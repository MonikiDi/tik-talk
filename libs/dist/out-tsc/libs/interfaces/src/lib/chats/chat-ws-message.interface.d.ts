export interface ChatWSMessageBase {
    status: 'success' | 'error';
}
export interface ChatWSUnreadMessage extends ChatWSMessageBase {
    action: 'unread';
    data: {
        count: number;
    };
}
export interface ChatWSNewMessage extends ChatWSMessageBase {
    action: 'message';
    data: {
        id: number;
        message: string;
        chat_id: number;
        created_at: string;
        author: number;
    };
}
export interface ChatWSErrorMessage extends ChatWSMessageBase {
    message: string;
}
export interface ChatWSSendMessage {
    text: string;
    chat_id: number;
}
export type ChatWSMessageReceive = ChatWSUnreadMessage | ChatWSNewMessage | ChatWSErrorMessage;
export type ChatWSMessageSend = ChatWSSendMessage;
export type ChatWSMessage = ChatWSMessageReceive | ChatWSMessageSend;
//# sourceMappingURL=chat-ws-message.interface.d.ts.map