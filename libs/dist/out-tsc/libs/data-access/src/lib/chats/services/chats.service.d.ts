import { Chat, LastMessageRes } from '@tt/interfaces/chats/chats.interface';
import { ChatWsService } from '@tt/interfaces/chats/chat-ws-service.interface';
import { ChatWSMessageReceive } from '@tt/interfaces/chats/chat-ws-message.interface';
export declare class ChatsService {
    #private;
    private readonly http;
    private readonly store;
    private readonly baseApiUrl;
    private readonly chatsUrl;
    wsAdapter: ChatWsService;
    private refresh$;
    connectWs(): import("rxjs").Observable<import("@tt/interfaces/chats/chat-ws-message.interface").ChatWSMessage>;
    refreshConnectWs(): void;
    handleWSMessage(message: ChatWSMessageReceive): void;
    createChat(userId: number): import("rxjs").Observable<Chat>;
    getMyChat(): import("rxjs").Observable<LastMessageRes[]>;
    getChatById(chatId: number): import("rxjs").Observable<Chat>;
}
//# sourceMappingURL=chats.service.d.ts.map