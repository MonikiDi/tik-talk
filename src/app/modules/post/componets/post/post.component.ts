import {Component, inject, input, OnInit, signal} from '@angular/core';
import {Post, PostComment} from '../../../../data/interfaces/post.interface';
import {AvatarCircleComponent} from '../../../../common-ui/avatar-circle/avatar-circle.component';
import {DatePipe} from '@angular/common';
import {SvgIconComponent} from '../../../../common-ui/svg-icon/svg-icon.component';
import {PostInputComponent} from '../post-input/post-input.component';
import {CommentComponent} from '../comment/comment.component';
import {PostService} from '../../ service/post.service';
import {firstValueFrom, switchMap} from 'rxjs';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    AvatarCircleComponent,
    DatePipe,
    SvgIconComponent,
    PostInputComponent,
    CommentComponent
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  postService = inject(PostService)
  post = input<Post>()
  comments = signal<PostComment[]>([])


  ngOnInit() {
    this.comments.set(this.post()!.comments);
  }

  async onCreated() {
    const comments = await firstValueFrom(this.postService.getCommentPostId(this.post()!.id))
    this.comments.set(comments)
  }

  onDeletePost(postId: number) {
    this.postService.deletePost(postId).subscribe()
  }
}
