import {Component, input} from '@angular/core';
import {AvatarCircleComponent} from '../../../../common-ui/avatar-circle/avatar-circle.component';
import {PostComment} from '../../../../data/interfaces/post.interface';
import {DataCreateAtPipe} from '../../../../helpers/pipes/data-create-at.pipe';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [
    AvatarCircleComponent,
    DataCreateAtPipe
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
comment= input<PostComment>()
}
