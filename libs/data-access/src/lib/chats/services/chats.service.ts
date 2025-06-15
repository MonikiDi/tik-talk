import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Chat,
  LastMessageRes,
  Message,
} from '@tt/interfaces/chats/chats.interface';
import {
  lastValueFrom,
  map,
  NEVER,
  Observable,
  of,
  startWith,
  Subject,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { ChatWsService } from '@tt/interfaces/chats/chat-ws-service.interface';
import {
  ChatWSMessage,
  ChatWSMessageReceive,
} from '@tt/interfaces/chats/chat-ws-message.interface';
import {
  isErrorMessage,
  isNewMessage,
  isUnreadMessage,
} from '@tt/interfaces/chats/type-guards';
import { ChatWsRxjsService } from './chat-ws-rxjs.service';
import { selectProfileMe } from '../../profile';
import { AuthService } from '../../auth/services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

  private readonly destroyRef = inject(DestroyRef);

  wsAdapter: ChatWsService = new ChatWsRxjsService();
  // private connect: Subscription | null = null;

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

  // connectWs() {
  //   this.connect?.unsubscribe();
  //   this.wsAdapter.disconnect();
  //   this.connect = this.wsAdapter
  //     .connect({
  //       url: `${this.baseApiUrl}chat/ws`,
  //       token: this.#authService.token ?? '',
  //       handleMessage: (message) => {
  //         this.handleWSMessage(message);
  //       },
  //     })
  //     .pipe(takeUntilDestroyed(this.destroyRef))
  //     .subscribe();
  // }
  //
  // public refreshConnectWs() {
  //   lastValueFrom(this.#authService.refreshAuthToken()).then(() => {
  //     return this.connectWs();
  //   });
  // }
  //
  // public disconnect() {
  //   this.connect?.unsubscribe();
  //   this.wsAdapter.disconnect();
  // }

  //TODO Замыкания
  handleWSMessage(message: ChatWSMessageReceive) {
    if (isErrorMessage(message)) {
      this.refreshConnectWs();
    }

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
