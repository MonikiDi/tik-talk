import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { PostEffects } from './effects';
import { postsFeature } from './reducers';

export const postProviders = [
  provideState(postsFeature),
  provideEffects(PostEffects),
];
