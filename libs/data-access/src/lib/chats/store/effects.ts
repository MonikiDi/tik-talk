import { inject } from '@angular/core';
import { Actions } from '@ngrx/effects';

export class ChatEffects {
  private actions$ = inject(Actions);
}
