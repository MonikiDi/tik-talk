import { Component, inject, input, OnInit, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {DataCreateAtPipe, GlobalStoreService} from '@tt/shared';
// import { ProfileService } from '@tt/profile';
import { assertNonNullish } from '@tt/shared';
import { normalizationText } from '@tt/shared';
import {CommentComponent, PostInputComponent} from '../../ui';
import {AvatarCircleComponent, SvgIconComponent} from '@tt/common-ui';
import {PostService} from '@tt/posts';
import {Post, PostComment} from '@tt/interfaces/post';


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
  private postService = inject(PostService);
  // private profileService = inject(ProfileService);
  #globalStoreService = inject(GlobalStoreService);
  post = input<Post>();
  comments = signal<PostComment[]>([]);
  profile = this.#globalStoreService.me;
  public parentData = signal('');

  ngOnInit() {
    this.comments.set(this.post()!.comments);
  }

  onDeletePost(postId: number) {
    this.postService.deletePost(postId).subscribe();
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
