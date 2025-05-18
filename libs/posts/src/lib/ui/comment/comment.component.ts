import { Component, input } from '@angular/core';
import { AvatarCircleComponent } from '@tt/common-ui';
import { DataCreateAtPipe } from '@tt/shared';
import {PostComment} from '@tt/interfaces/post';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [AvatarCircleComponent, DataCreateAtPipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  comment = input<PostComment>();
}
