import { webSocket } from 'rxjs/webSocket';
import { finalize, tap } from 'rxjs';
export class ChatWsRxjsService {
    #socket = null;
    connect(params) {
        if (!this.#socket) {
            this.#socket = webSocket({
                url: params.url,
                protocol: [params.token],
            });
        }
        return this.#socket.asObservable().pipe(tap((message) => params.handleMessage(message)), finalize(() => console.log('Чат закрыт')));
    }
    disconnect() {
        this.#socket?.complete();
        this.#socket = null;
    }
    sendMessage(text, chatId) {
        this.#socket?.next({
            text,
            chat_id: chatId,
        });
    }
}
//# sourceMappingURL=chat-ws-rxjs.service.js.map