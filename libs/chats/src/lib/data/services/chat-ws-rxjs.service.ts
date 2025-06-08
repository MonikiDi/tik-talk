import {
  ChatConnectionWSParams,
  ChatWsService,
} from '@tt/interfaces/chats/chat-ws-service.interface';
import { WebSocketSubject } from 'rxjs/internal/observable/dom/WebSocketSubject';
import {
  ChatWSMessage,
  ChatWSMessageReceive,
} from '@tt/interfaces/chats/chat-ws-message.interface';
import { webSocket } from 'rxjs/webSocket';
import { finalize, tap } from 'rxjs';

export class ChatWsRxjsService implements ChatWsService {
  #socket: WebSocketSubject<ChatWSMessage> | null = null;

  connect(params: ChatConnectionWSParams) {
    if (!this.#socket) {
      this.#socket = webSocket({
        url: params.url,
        protocol: [params.token],
      });
    }

    return this.#socket.asObservable().pipe(
      tap((message) => params.handleMessage(message as ChatWSMessageReceive)),
      finalize(() => console.log('Чат закрыт'))
    );
  }

  disconnect(): void {
    this.#socket?.complete();
  }

  sendMessage(text: string, chatId: number): void {
    this.#socket?.next({
      text,
      chat_id: chatId,
    });
  }
}
