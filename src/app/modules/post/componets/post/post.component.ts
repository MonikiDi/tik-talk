import {Component, inject, input, OnInit, signal} from '@angular/core';
import {Post, PostComment} from '../../../../data/interfaces/post.interface';
import {AvatarCircleComponent} from '../../../../common-ui/avatar-circle/avatar-circle.component';
import {SvgIconComponent} from '../../../../common-ui/svg-icon/svg-icon.component';
import {PostInputComponent} from '../post-input/post-input.component';
import {CommentComponent} from '../comment/comment.component';
import {PostService} from '../../ service/post.service';
import {firstValueFrom} from 'rxjs';
import {DataCreateAtPipe} from '../../../../helpers/pipes/data-create-at.pipe';
import {ProfileService} from '../../../../data/services/profile.service';

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
  styleUrl: './post.component.scss'
})

export class PostComponent implements OnInit {
  private postService = inject(PostService)
  private profileService = inject(ProfileService);
  post = input<Post>()
  comments = signal<PostComment[]>([])
  profile = this.profileService.me
  public parentData = signal('')


  ngOnInit() {
    this.comments.set(this.post()!.comments);
  }

  onDeletePost(postId: number) {
    this.postService.deletePost(postId).subscribe()
  }


  onCreateCommit(text: string) {
    const profile = this.profile()
    const result = this.normalizationText(text);
    const post = this.post()
    assertNonNullish(profile, '')
    assertNonNullish(result, '')
    assertNonNullish(post, '')


    if (this.parentData() === '' || result === '') {
      this.parentData.set('')
      return
    }


    //   TODO  нужно релиозвать функционал позволяющий из вне обновить состояние инпунта
    firstValueFrom(this.postService.createComment({
      text: result,
      authorId: profile.id,
      postId: post.id,
      commentId: 0,
    })).then(() => {
      return firstValueFrom(this.postService.getCommentPostId(this.post()!.id))
    }).then((comments) => {
      this.comments.set(comments)
      this.parentData.set('')
    })
  }


  normalizationText(text: string) {
    return text.replace(/\n+/g, '\n') === '\n' ? '' : text
  }

}

function assertNonNullish<TValue>(
  value: TValue,
  message: string
): asserts value is NonNullable<TValue> {
  if (value === null || value === undefined) {
    throw Error(message);
  }
}
