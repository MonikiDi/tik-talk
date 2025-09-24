import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { AvatarCircleComponent, SvgIconComponent } from '@tt/common-ui';
import { DataCreateAtPipe } from '@tt/shared';
import { Post, PostComment } from '@tt/interfaces/post';
import { postsActions, selectProfileMe, selectUser } from '@tt/data-access';
import { Store } from '@ngrx/store';
import { EditPostComponent } from '@tt/posts';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [AvatarCircleComponent, DataCreateAtPipe, SvgIconComponent, EditPostComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent {
  private readonly store = inject(Store);
  public comment = input<PostComment>();
  public hasMe = input<boolean>();
  public meId = this.store.selectSignal(selectProfileMe);

  onDeleteComment(postId: number, commentId: number) {
    this.store.dispatch(postsActions.deleteComment({ postId, commentId }));
  }

}
