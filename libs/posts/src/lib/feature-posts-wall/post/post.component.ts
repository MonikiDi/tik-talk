import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { catchError, throwError } from 'rxjs';
import {
  assertNonNullish,
  DataCreateAtPipe,
  normalizationText,
} from '@tt/shared';
import { CommentComponent, PostInputComponent } from '../../ui';
import { AvatarCircleComponent, SvgIconComponent } from '@tt/common-ui';
import { Post } from '@tt/interfaces/post';
import { Store } from '@ngrx/store';
import { postsActions, PostService, selectProfileMe } from '@tt/data-access';
import { NgClass } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EditPostComponent } from '../edit-post/edit-post.component';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    AvatarCircleComponent,
    SvgIconComponent,
    PostInputComponent,
    CommentComponent,
    DataCreateAtPipe,
    NgClass,
    EditPostComponent,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent {
  private readonly postService = inject(PostService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly store = inject(Store);
  public post = input.required<Post>();
  public hasMe = input<boolean>();
  public profile = this.store.selectSignal(selectProfileMe);
  public parentData = signal('');
  public isActiveComments = false;
  public likes = computed(() => {
    return this.post().likes;
  });
  public comments = computed(() => {
    return this.post().comments;
  });
  public isVisible = true;

  onDeletePost(postId: number) {
    this.store.dispatch(postsActions.deletePost({ postId }));
  }

  onCreateCommit(text: string) {
    const profile = this.profile();
    const result = normalizationText(text);
    const post = this.post();
    assertNonNullish(profile, '');
    assertNonNullish(result, '');
    assertNonNullish(post, '');

    if (this.parentData() === '' || result === '') {
      this.parentData.set('');
      return;
    }

    this.store.dispatch(
      postsActions.createComment({
        text: result,
        authorId: profile.id,
        postId: post.id,
        commentId: 0,
      })
    );
    this.parentData.set('');

    // firstValueFrom(
    //   this.postService.createComment({
    //     text: result,
    //     authorId: profile.id,
    //     postId: post.id,
    //     commentId: 0,
    //   })
    // )
    //   .then(() => {
    //     return firstValueFrom(
    //       this.postService.getCommentPostId(this.post()!.id)
    //     );
    //   })
    //   .then((comments) => {
    //     this.comments.set(comments);
    //     this.parentData.set('');
    //   });
  }

  toggleLikes(post: Post) {
    this.postService
      .addLike(post.id)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error.detail === 'Like is already created') {
            return this.postService.deleteLike(post.id);
          }
          return throwError(() => {
            return error;
          });
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((response) => {
        this.store.dispatch(
          postsActions.updatePosts({
            post: {
              ...this.post(),
              likes:
                response.message === 'Like created'
                  ? this.post().likes + 1
                  : this.post().likes - 1,
            },
          })
        );
      });
  }

  toggleComment() {
    if (this.post()!.comments.length >= 0) {
      this.isActiveComments = !this.isActiveComments;
    }
  }

  onEditPost() {
    this.isVisible = !this.isVisible;
  }

  handleChildEvent(isVisible: boolean) {
    this.isVisible = isVisible;
  }
}
