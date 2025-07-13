import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  EventEmitter,
  inject,
  input,
  OnInit,
  Output,
  Renderer2,
  viewChild,
} from '@angular/core';
import { Post, PostEdit } from '@tt/interfaces/post/post.interface';
import { FormsModule } from '@angular/forms';
import { postsActions } from '@tt/data-access';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPostComponent implements OnInit {
  private readonly r2 = inject(Renderer2);
  private readonly store = inject(Store);
  private readonly textAreaTarget =
    viewChild.required<ElementRef<void>>('textAreaTarget');
  public post = input.required<Post>();
  public postEdit: PostEdit = {
    title: '',
    content: '',
  };
  @Output() isVisible = new EventEmitter<boolean>();

  constructor() {
    effect(() => {
      this.r2.setStyle(
        this.textAreaTarget().nativeElement,
        'height',
        (this.textAreaTarget().nativeElement as any).scrollHeight + 'px'
      );
    });
  }

  ngOnInit() {
    this.postEdit.content = this.post().content;
    this.postEdit.title = this.post().title;
  }

  submitEditPost() {
    this.store.dispatch(
      postsActions.editPost({ postId: this.post().id, postEdit: this.postEdit })
    );
    this.isVisible.emit(true);
  }

  cancelEditPost() {
    this.isVisible.emit(true);
  }
}
