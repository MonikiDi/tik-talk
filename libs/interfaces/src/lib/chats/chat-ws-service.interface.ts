import { ChatWSMessage, ChatWSMessageReceive } from './chat-ws-message.interface';
import { Observable } from 'rxjs';

export interface ChatConnectionWSParams {
  url: string;
  token: string;

  handleMessage(message: ChatWSMessageReceive): void;
}

export interface ChatWsService {
  connect: (params: ChatConnectionWSParams) => Observable<ChatWSMessage>;
  sendMessage: (text: string, chatId: number) => void;
  disconnect: () => void;
}
