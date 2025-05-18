import { Component, input } from '@angular/core';
import { AvatarCircleComponent } from '@tt/common-ui';
import { DataCreateAtPipe } from '../../../../../../apps/tik-talk/src/app/helpers/pipes/data-create-at.pipe';
import { PostComment } from '../../data';

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
