import { createSelector } from '@ngrx/store';
import { postsFeature } from './reducers';

export const selectPosts = createSelector(postsFeature.selectPosts, (state) => {
  return state;
});
