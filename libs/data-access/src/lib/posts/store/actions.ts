import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Post, PostCreateDto } from '@tt/interfaces/post';

export const postsActions = createActionGroup({
  source: 'posts',
  events: {
    'load posts': emptyProps(),
    'loaded posts': props<{ posts: Post[] }>(),
    'update posts': props<{ post: Post }>(),
    'create post': props<PostCreateDto>(),
    'created post': props<Post>(),
    'delete post': props<{ postId: number }>(),
    'deleted post': props<{ postId: number }>(),
    'load posts user id': props<{ userId: number }>(),
    'loaded posts user id': props<{ posts: Post[] }>(),
  },
});
