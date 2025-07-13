import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { postsActions } from './actions';
import { map, switchMap } from 'rxjs';
import { PostService } from '../services/post.service';

export class PostEffects {
  actions$ = inject(Actions);
  private readonly postService = inject(PostService);

  // getPosts$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(postsActions.loadPosts),
  //     switchMap(() => {
  //       return this.postService
  //         .fetchPosts()
  //         .pipe(
  //           map((response) => postsActions.loadedPosts({ posts: response }))
  //         );
  //     })
  //   );
  // });
  addPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(postsActions.createPost),
      switchMap((data) => {
        return this.postService
          .createPost(data)
          .pipe(map((post) => postsActions.createdPost(post)));
      })
    );
  });
  deletePostId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(postsActions.deletePost),
      switchMap((data) => {
        return this.postService
          .deletePost(data.postId)
          .pipe(map(() => postsActions.deletedPost({ postId: data.postId })));
      })
    );
  });
  getPostsUserId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(postsActions.loadPostsUserId),
      switchMap((data) => {
        return this.postService
          .getPostsUserId(data.userId)
          .pipe(
            map((response) =>
              postsActions.loadedPostsUserId({ userPosts: response })
            )
          );
      })
    );
  });
  addCommentPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(postsActions.createComment),
      switchMap((data) => {
        return this.postService
          .createComment(data)
          .pipe(map((response) => postsActions.createdComment(response)));
      })
    );
  });
  deleteCommentId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(postsActions.deleteComment),
      switchMap((data) => {
        return this.postService.deleteComment(data.commentId).pipe(
          map(() =>
            postsActions.deletedComment({
              postId: data.postId,
              commentId: data.commentId,
            })
          )
        );
      })
    );
  });
  editPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(postsActions.editPost),
      switchMap((data) => {
        return this.postService
          .updatePost(data.postId, data.postEdit)
          .pipe(map((post) => postsActions.editedPost(post)));
      })
    );
  });
}
