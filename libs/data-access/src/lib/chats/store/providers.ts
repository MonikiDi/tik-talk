import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { ChatEffects } from './effects';
import { chatsFeature } from './reducers';

export const chatProviders = [
  provideState(chatsFeature),
  provideEffects(ChatEffects),
];
