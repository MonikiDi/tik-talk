import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { ChatsService } from '../services/chats.service';
import { chatsActions } from './actions';
import { ProfileService } from '../../profile/services/profile.service';
export class ChatEffects {
    actions$ = inject(Actions);
    chatsService = inject(ChatsService);
    profileService = inject(ProfileService);
    getMyChatById$ = createEffect(() => {
        return this.actions$.pipe(ofType(chatsActions.loadGetChatById), switchMap((data) => {
            return this.chatsService
                .getChatById(data.chatId)
                .pipe(map((response) => chatsActions.loadedGetChatById({ chats: response })));
        }));
    });
    getlastMesageChat$ = createEffect(() => {
        return this.actions$.pipe(ofType(chatsActions.loadLastMessageChatMap), switchMap(() => {
            return this.chatsService
                .getMyChat()
                .pipe(map((response) => chatsActions.loadedLastMessageChatMap({ chats: response })));
        }));
    });
    addLastMessageChat$ = createEffect(() => {
        return this.actions$.pipe(ofType(chatsActions.getProfileId), switchMap((data) => {
            return this.profileService.getAccount(data.profileId).pipe(map((response) => {
                return chatsActions.addLastMessageChat({
                    chatId: data.message.data.chat_id.toString(),
                    message: {
                        id: data.message.data.id,
                        userFrom: response,
                        message: data.message.data.message,
                        createdAt: data.message.data.created_at,
                        unreadMessages: 1,
                    },
                });
            }));
        }));
    });
}
//# sourceMappingURL=effects.js.map