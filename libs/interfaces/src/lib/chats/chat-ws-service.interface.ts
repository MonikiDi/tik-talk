import { ChatWSMessage } from './chat-ws-message.interface';

export interface ChatConnectionWSParams {
  url: string;
  token: string;

  handleMessage(message: ChatWSMessage): void;
}

export interface ChatWsService {
  connect: (params: ChatConnectionWSParams) => void;
  sendMessage: (text: string, chatId: number) => void;
  disconnect: () => void;
}
