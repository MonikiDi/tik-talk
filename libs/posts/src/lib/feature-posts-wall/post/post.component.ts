import { Component, inject, input, OnInit, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { DataCreateAtPipe } from '@tt/shared';
import { assertNonNullish } from '@tt/shared';
import { normalizationText } from '@tt/shared';
import { CommentComponent, PostInputComponent } from '../../ui';
import { AvatarCircleComponent, SvgIconComponent } from '@tt/common-ui';
import { Post, PostComment } from '@tt/interfaces/post';
import { Store } from '@ngrx/store';
import { postsActions, PostService, selectProfileMe } from '@tt/data-access';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    AvatarCircleComponent,
    SvgIconComponent,
    PostInputComponent,
    CommentComponent,
    DataCreateAtPipe,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  store = inject(Store);
  private postService = inject(PostService);
  post = input<Post>();
  comments = signal<PostComment[]>([]);
  profile = this.store.selectSignal(selectProfileMe);
  public parentData = signal('');
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

  addLikes(id: number) {
    this.postService.addLike(id).subscribe();
  }
}
