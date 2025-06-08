import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { profileFeature } from './reducers';
import { ProfileEffects } from './effects';

export const profileProviders = [
  provideState(profileFeature),
  provideEffects(ProfileEffects),
];
