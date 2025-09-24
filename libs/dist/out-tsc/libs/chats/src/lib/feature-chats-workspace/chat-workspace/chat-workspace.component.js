import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, computed, inject, } from '@angular/core';
import { ChatWorkspaceHeaderComponent } from './chat-workspace-header/chat-workspace-header.component';
import { ChatWorkspaceMessagesWrapperComponent } from './chat-workspace-messages-wrapper/chat-workspace-messages-wrapper.component';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, of, switchMap } from 'rxjs';
import { chatsActions, ChatsService, hasLastMessageById, selectActiveChat, selectProfileMe, } from '@tt/data-access';
import { Store } from '@ngrx/store';
let ChatWorkspaceComponent = class ChatWorkspaceComponent {
    chatsService = inject(ChatsService);
    route = inject(ActivatedRoute);
    store = inject(Store);
    router = inject(Router);
    me = this.store.selectSignal(selectProfileMe);
    activeChat = this.store.selectSignal(selectActiveChat);
    companion = computed(() => {
        const activeChat = this.activeChat();
        if (!activeChat)
            return undefined;
        return activeChat.userFirst.id === this.me()?.id
            ? activeChat.userSecond
            : activeChat.userFirst;
    });
    chatId$ = this.route.params.pipe(map(({ id }) => id));
    ngOnInit() {
        this.chatId$
            .pipe(switchMap((id) => {
            if (id === 'new') {
                return this.route.queryParams.pipe(filter(({ userId }) => userId), switchMap(({ userId }) => {
                    return this.chatsService.createChat(userId).pipe(switchMap((chat) => {
                        return of({ id: chat.id, isRedirect: true });
                    }));
                }));
            }
            return of({ id, isRedirect: false });
        }))
            .subscribe(({ id, isRedirect }) => {
            if (isRedirect) {
                this.router.navigate(['chats', id]);
                return;
            }
            this.store.dispatch(chatsActions.setActiveChatId({ chatId: id }));
            if (this.store.selectSignal(hasLastMessageById(id))()) {
                this.store.dispatch(chatsActions.upsertLastMessageChat({
                    chatId: id,
                    message: {
                        unreadMessages: 0,
                    },
                }));
            }
            this.store.dispatch(chatsActions.loadGetChatById({ chatId: id }));
        });
    }
};
ChatWorkspaceComponent = __decorate([
    Component({
        selector: 'app-chat-workspace',
        standalone: true,
        imports: [
            ChatWorkspaceHeaderComponent,
            ChatWorkspaceMessagesWrapperComponent,
        ],
        templateUrl: './chat-workspace.component.html',
        styleUrl: './chat-workspace.component.scss',
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
], ChatWorkspaceComponent);
export { ChatWorkspaceComponent };
//# sourceMappingURL=chat-workspace.component.js.map