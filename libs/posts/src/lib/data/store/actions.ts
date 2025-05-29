import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Post, PostCreateDto } from '@tt/interfaces/post';

export const postsActions = createActionGroup({
  source: 'posts',
  events: {
    'load posts': emptyProps(),
    'loaded posts': props<{ posts: Post[] }>(),
    'create post': props<PostCreateDto>(),
    'delete post': props<{ postId: number }>(),
    'deleted post': props<Post>(),
  },
});
