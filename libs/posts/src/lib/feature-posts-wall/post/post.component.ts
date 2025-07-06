import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { catchError, firstValueFrom, map, throwError } from 'rxjs';
import { DataCreateAtPipe } from '@tt/shared';
import { assertNonNullish } from '@tt/shared';
import { normalizationText } from '@tt/shared';
import { CommentComponent, PostInputComponent } from '../../ui';
import { AvatarCircleComponent, SvgIconComponent } from '@tt/common-ui';
import { Post, PostComment } from '@tt/interfaces/post';
import { Store } from '@ngrx/store';
import { postsActions, PostService, selectProfileMe } from '@tt/data-access';
import { NgClass } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

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
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements OnInit {
  store = inject(Store);
  private postService = inject(PostService);
  post = input.required<Post>();
  hasMe = input<boolean>();
  comments = signal<PostComment[]>([]);
  profile = this.store.selectSignal(selectProfileMe);
  public parentData = signal('');
  public isActiveComments = false;
  likes = computed(() => {
    return this.post().likes;
  });

  ngOnInit() {
    this.comments.set(this.post()!.comments);
  }

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

    firstValueFrom(
      this.postService.createComment({
        text: result,
        authorId: profile.id,
        postId: post.id,
        commentId: 0,
      })
    )
      .then(() => {
        return firstValueFrom(
          this.postService.getCommentPostId(this.post()!.id)
        );
      })
      .then((comments) => {
        this.comments.set(comments);
        this.parentData.set('');
      });
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
        })
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
    if (this.post()!.comments.length > 0) {
      this.isActiveComments = !this.isActiveComments;
    }
  }
}
