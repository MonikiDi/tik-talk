import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { ChatsService } from '../services/chats.service';
import { chatsActions } from './actions';

export class ChatEffects {
  actions$ = inject(Actions);
  private chatsService = inject(ChatsService);

  getMyChat$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(chatsActions.loadChats),
      switchMap(() => {
        return this.chatsService
          .getMyChat()
          .pipe(
            map((response) => chatsActions.loadedChats({ chats: response }))
          );
      })
    );
  });
}
