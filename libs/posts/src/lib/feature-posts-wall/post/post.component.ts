import { Component, inject, input, OnInit, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { DataCreateAtPipe } from '../../../../../../apps/tik-talk/src/app/helpers/pipes/data-create-at.pipe';
import { ProfileService } from '@tt/profile';
import { assertNonNullish } from '../../../../../../apps/tik-talk/src/app/shared/utils/assert-non-nullish';
import { normalizationText } from '../../../../../../apps/tik-talk/src/app/shared/utils/normalization-text';
import { AvatarCircleComponent } from 'libs/common-ui/src/lib/common-ui/components/avatar-circle/avatar-circle.component';
import { SvgIconComponent } from 'libs/common-ui/src/lib/common-ui/components/svg-icon/svg-icon.component';
import {CommentComponent, PostInputComponent} from '../../ui';
import {Post, PostComment, PostService} from '../../data';


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
  private profileService = inject(ProfileService);
  post = input<Post>();
  comments = signal<PostComment[]>([]);
  profile = this.profileService.me;
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
