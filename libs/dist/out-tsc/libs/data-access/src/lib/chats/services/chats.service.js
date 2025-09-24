import { __decorate } from "tslib";
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, startWith, Subject, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { isErrorMessage, isNewMessage, isUnreadMessage, } from '@tt/interfaces/chats/type-guards';
import { ChatWsRxjsService } from './chat-ws-rxjs.service';
import { AuthService } from '../../auth/services/auth.service';
import { getChatBuId, getLastMessageId, selectActiveChatId, } from '../store/selectors';
import { chatsActions } from '../store/actions';
let ChatsService = class ChatsService {
    http = inject(HttpClient);
    #authService = inject(AuthService);
    store = inject(Store);
    baseApiUrl = '/yt-course/';
    chatsUrl = `${this.baseApiUrl}chat/`;
    wsAdapter = new ChatWsRxjsService();
    refresh$ = new Subject();
    connectWs() {
        return this.refresh$.pipe(startWith(true), switchMap((data) => {
            return data
                ? of({
                    access_token: this.#authService.token || '',
                })
                : this.#authService.refreshAuthToken();
        }), switchMap(({ access_token }) => {
            this.wsAdapter.disconnect();
            return this.wsAdapter.connect({
                url: `${this.baseApiUrl}chat/ws`,
                token: access_token,
                handleMessage: (message) => {
                    this.handleWSMessage(message);
                },
            });
        }));
    }
    refreshConnectWs() {
        this.refresh$.next();
    }
    handleWSMessage(message) {
        if (isErrorMessage(message)) {
            this.refreshConnectWs();
        }
        if (isUnreadMessage(message)) {
            this.store.dispatch(chatsActions.setUnread({ unread: message.data.count }));
        }
        if (isNewMessage(message)) {
            const chat = this.store.selectSignal(getChatBuId(message.data.chat_id.toString()));
            const lastMessageId = this.store.selectSignal(getLastMessageId(message.data.chat_id.toString()));
            const activeChatId = this.store.selectSignal(selectActiveChatId);
            if (chat()) {
                this.store.dispatch(chatsActions.addMessageChat({
                    chatId: message.data.chat_id.toString(),
                    message: {
                        id: message.data.id,
                        userFromId: message.data.author,
                        personalChatId: message.data.chat_id,
                        text: message.data.message,
                        createdAt: message.data.created_at,
                        isRead: false,
                    },
                }));
            }
            if (lastMessageId()) {
                this.store.dispatch(chatsActions.upsertLastMessageChat({
                    chatId: message.data.chat_id.toString(),
                    message: {
                        id: message.data.chat_id,
                        userFrom: lastMessageId().userFrom,
                        message: message.data.message,
                        createdAt: message.data.created_at,
                        unreadMessages: activeChatId() === message.data.chat_id.toString()
                            ? lastMessageId().unreadMessages
                            : lastMessageId().unreadMessages + 1,
                    },
                }));
            }
            else {
                this.store.dispatch(chatsActions.getProfileId({
                    profileId: message.data.author.toString(),
                    message: message,
                }));
            }
        }
    }
    createChat(userId) {
        return this.http.post(`${this.chatsUrl}${userId}`, {});
    }
    getMyChat() {
        return this.http.get(`${this.chatsUrl}get_my_chats/`);
    }
    getChatById(chatId) {
        return this.http.get(`${this.chatsUrl}${chatId}`);
    }
};
ChatsService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], ChatsService);
export { ChatsService };
//# sourceMappingURL=chats.service.js.map