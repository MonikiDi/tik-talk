import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chat, LastMessageRes } from '@tt/interfaces/chats/chats.interface';
import { map, of, startWith, Subject, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { ChatWsService } from '@tt/interfaces/chats/chat-ws-service.interface';
import { ChatWSMessageReceive } from '@tt/interfaces/chats/chat-ws-message.interface';
import {
  isErrorMessage,
  isNewMessage,
  isUnreadMessage,
} from '@tt/interfaces/chats/type-guards';
import { ChatWsRxjsService } from './chat-ws-rxjs.service';
import { selectProfileMe } from '../../profile';
import { AuthService } from '../../auth/services/auth.service';
import { selectActiveChatId } from '../store/selectors';
import { chatsActions } from '../store/actions';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  private readonly http = inject(HttpClient);
  #authService = inject(AuthService);
  private readonly store = inject(Store);
  private readonly baseApiUrl = 'https://icherniakov.ru/yt-course/';
  private readonly chatsUrl = `${this.baseApiUrl}chat/`;
  me = this.store.selectSignal(selectProfileMe);
  // activeChatMessages = signal<Message[]>([]);

  wsAdapter: ChatWsService = new ChatWsRxjsService();
  private refresh$ = new Subject<void>();

  connectWs() {
    return this.refresh$.pipe(
      startWith(true),
      switchMap((data) => {
        return data
          ? of({
              access_token: this.#authService.token || '',
            })
          : this.#authService.refreshAuthToken();
      }),
      switchMap(({ access_token }) => {
        this.wsAdapter.disconnect();
        return this.wsAdapter.connect({
          url: `${this.baseApiUrl}chat/ws`,
          token: access_token,
          handleMessage: (message) => {
            this.handleWSMessage(message);
          },
        });
      })
    );
  }

  public refreshConnectWs() {
    this.refresh$.next();
  }

  public handleWSMessage(message: ChatWSMessageReceive) {
    if (isErrorMessage(message)) {
      this.refreshConnectWs();
    }

    if (isUnreadMessage(message)) {
      // TODO
    }

    if (isNewMessage(message)) {
      const activeChatId = this.store.selectSignal(selectActiveChatId);
      if (activeChatId()) {
        this.store.dispatch(chatsActions.recordsAMessage({ data: message }));
      }

      // this.activeChatMessages.set([
      //   ...this.activeChatMessages(),
      //   {
      //     id: message.data.id,
      //     userFromId: message.data.author,
      //     personalChatId: message.data.chat_id,
      //     text: message.data.message,
      //     createdAt: message.data.created_at,
      //     isRead: false,
      //     isMine: false,
      //   },
      // ]);
    }
  }

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
        // this.activeChatMessages.set(patchMessages);
        return {
          ...chat,
          messages: patchMessages,
        };
      })
    );
  }
}
