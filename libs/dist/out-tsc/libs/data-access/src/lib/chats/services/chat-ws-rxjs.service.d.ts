import { ChatConnectionWSParams, ChatWsService } from '@tt/interfaces/chats/chat-ws-service.interface';
import { ChatWSMessage } from '@tt/interfaces/chats/chat-ws-message.interface';
export declare class ChatWsRxjsService implements ChatWsService {
    #private;
    connect(params: ChatConnectionWSParams): import("rxjs").Observable<ChatWSMessage>;
    disconnect(): void;
    sendMessage(text: string, chatId: number): void;
}
//# sourceMappingURL=chat-ws-rxjs.service.d.ts.map