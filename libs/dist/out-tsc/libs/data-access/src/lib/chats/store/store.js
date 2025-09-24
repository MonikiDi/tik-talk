import { createFeature } from '@ngrx/store';
import { reducer } from './reducers';
export const chatsFeature = createFeature({
    name: 'chatsFeature',
    reducer: reducer,
});
//# sourceMappingURL=store.js.map