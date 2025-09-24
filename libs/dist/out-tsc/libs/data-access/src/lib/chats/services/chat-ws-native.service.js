"use strict";
// import {
//   ChatConnectionWSParams,
//   ChatWsService,
// } from '@tt/interfaces/chats/chat-ws-service.interface';
//
// export class ChatWsNativeService implements ChatWsService {
//   #socket: WebSocket | null = null;
//
//   connect(params: ChatConnectionWSParams): void {
//     if (this.#socket) return;
//     this.#socket = new WebSocket(params.url, [params.token]);
//
//     this.#socket.onmessage = (event: MessageEvent) => {
//       // TODO обработка сообщения event.data
//       params.handleMessage(JSON.parse(event.data));
//     };
//
//     this.#socket.close = () => {
//       console.log('Чат закрыт');
//     };
//   }
//
//   sendMessage(text: string, chatId: number): void {
//     this.#socket?.send(
//       JSON.stringify({
//         text,
//         chat_id: chatId,
//       })
//     );
//   }
//
//   disconnect(): void {
//     this.#socket?.close();
//   }
// }
//# sourceMappingURL=chat-ws-native.service.js.map