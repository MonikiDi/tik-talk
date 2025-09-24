import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { ChatEffects } from './effects';
import { chatsFeature } from './store';
export const chatProviders = [
    provideState(chatsFeature),
    provideEffects(ChatEffects),
];
//# sourceMappingURL=providers.js.map