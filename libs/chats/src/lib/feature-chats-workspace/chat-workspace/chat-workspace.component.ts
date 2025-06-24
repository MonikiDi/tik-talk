import { Component, computed, inject, OnInit } from '@angular/core';
import { ChatWorkspaceHeaderComponent } from './chat-workspace-header/chat-workspace-header.component';
import { ChatWorkspaceMessagesWrapperComponent } from './chat-workspace-messages-wrapper/chat-workspace-messages-wrapper.component';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, of, switchMap } from 'rxjs';
import {
  chatsActions,
  ChatsService,
  selectActiveChat,
  selectProfileMe,
} from '@tt/data-access';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-chat-workspace',
  standalone: true,
  imports: [
    ChatWorkspaceHeaderComponent,
    ChatWorkspaceMessagesWrapperComponent,
  ],
  templateUrl: './chat-workspace.component.html',
  styleUrl: './chat-workspace.component.scss',
})
export class ChatWorkspaceComponent implements OnInit {
  private readonly chatsService = inject(ChatsService);
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  public readonly activeChat = this.store.selectSignal(selectActiveChat);
  public readonly me = this.store.selectSignal(selectProfileMe);
  public readonly companion = computed(() => {
    const activeChat = this.activeChat();
    if (!activeChat) return undefined;
    return activeChat.userFirst.id === this.me()?.id
      ? activeChat.userSecond
      : activeChat.userFirst;
  });

  private readonly chatId$ = this.route.params.pipe(map(({ id }) => id));

  ngOnInit() {
    this.chatId$
      .pipe(
        switchMap((id) => {
          if (id === 'new') {
            return this.route.queryParams.pipe(
              filter(({ userId }) => userId),
              switchMap(({ userId }) => {
                return this.chatsService.createChat(userId).pipe(
                  switchMap((chat) => {
                    return of({ id: chat.id, isRedirect: true });
                  })
                );
              })
            );
          }
          return of({ id, isRedirect: false });
        })
      )
      .subscribe(({ id, isRedirect }) => {
        if (isRedirect) {
          this.router.navigate(['chats', id]);
          return;
        }
        this.store.dispatch(chatsActions.addActiveChatId({ chatId: id }));
        this.store.dispatch(chatsActions.loadGetChatById({ chatId: id }));
      });
  }
}
