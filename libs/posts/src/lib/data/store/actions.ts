import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Post } from '@tt/interfaces/post';

export const postsActions = createActionGroup({
  source: 'posts',
  events: {
    'load posts': emptyProps(),
    'loaded posts': props<{ posts: Post[] }>(),
  },
});
