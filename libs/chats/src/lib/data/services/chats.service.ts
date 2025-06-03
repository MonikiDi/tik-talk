import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Chat,
  LastMessageRes,
  Message,
} from '@tt/interfaces/chats/chats.interface';
import { selectProfileMe } from '@tt/profile';
import { map } from 'rxjs';
import { Store } from '@ngrx/store';
import { ChatWsService } from '@tt/interfaces/chats/chat-ws-service.interface';
import { ChatWsNativeService } from './chat-ws-native.service';
import { AuthService } from '@tt/auth';
import { ChatWSMessage } from '@tt/interfaces/chats/chat-ws-message.interface';
import {
  isNewMessage,
  isUnreadMessage,
} from '@tt/interfaces/chats/type-guards';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  private readonly http = inject(HttpClient);
  #authService = inject(AuthService);
  private readonly store = inject(Store);
  private readonly baseApiUrl = 'https://icherniakov.ru/yt-course/';
  private readonly chatsUrl = `${this.baseApiUrl}chat/`;
  private readonly messagesUrl = `${this.baseApiUrl}message/`;
  me = this.store.selectSignal(selectProfileMe);
  activeChatMessages = signal<Message[]>([]);

  wsAdapter: ChatWsService = new ChatWsNativeService();

  connectWs() {
    this.wsAdapter.connect({
      url: `${this.baseApiUrl}chat/ws`,
      token: this.#authService.token ?? '',
      handleMessage: this.handleWSMessage,
    });
  }

  //TODO Замыкания
  handleWSMessage = (message: ChatWSMessage) => {
    if (!('action' in message)) return;

    if (isUnreadMessage(message)) {
      // TODO
    }

    if (isNewMessage(message)) {
      this.activeChatMessages.set([
        ...this.activeChatMessages(),
        {
          id: message.data.id,
          userFromId: message.data.author,
          personalChatId: message.data.chat_id,
          text: message.data.message,
          createdAt: message.data.created_at,
          isRead: false,
          isMine: false,
        },
      ]);
    }
  };

  createChat(userId: number) {
    return this.http.post<Chat>(`${this.chatsUrl}${userId}`, {});
  }

  getMyChat() {
    return this.http.get<LastMessageRes[]>(`${this.chatsUrl}get_my_chats/`);
  }

  getChatById(chatId: number) {
    return this.http.get<Chat>(`${this.chatsUrl}${chatId}`).pipe(
      map((chat: Chat) => {
        const patchMessages = chat.messages.map((message) => {
          return {
            ...message,
            user:
              chat.userFirst.id === message.userFromId
                ? chat.userFirst
                : chat.userSecond,
            isMine: message.userFromId === this.me()!.id,
          };
        });
        this.activeChatMessages.set(patchMessages);
        return {
          ...chat,
          companion:
            chat.userFirst.id === this.me()!.id
              ? chat.userSecond
              : chat.userFirst,
          messages: patchMessages,
        };
      })
    );
  }

  sendMessage(chatId: number, message: string) {
    return this.http.post(
      `${this.messagesUrl}send/${chatId}`,
      {},
      {
        params: {
          message: message,
        },
      }
    );
  }
}
