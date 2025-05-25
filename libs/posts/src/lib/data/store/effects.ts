import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { postsActions } from './actions';
import { map, switchMap } from 'rxjs';
import { PostService } from '../services/post.service';

export class PostEffects {
  actions$ = inject(Actions);
  private readonly postService = inject(PostService);

  getPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(postsActions.loadPosts),
      switchMap(() => {
        return this.postService
          .fetchPosts()
          .pipe(
            map((response) => postsActions.loadedPosts({ posts: response }))
          );
      })
    );
  });
  addPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(postsActions.createPost),
      switchMap((data) => {
        return this.postService
          .createPost(data)
          .pipe(map(() => postsActions.loadPosts()));
      })
    );
  });
  deletePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(postsActions.deletePost),
      switchMap((data) => {
        return this.postService
          .deletePost(data.postId)
          .pipe(map(() => postsActions.loadPosts()));
      })
    );
  });
}
