import {
  AfterViewInit,
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
  ViewChild,
  viewChild
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
export class EditPostComponent implements OnInit, AfterViewInit {
  private readonly r2 = inject(Renderer2);
  private readonly store = inject(Store);
  private readonly textAreaTarget =
    viewChild.required<ElementRef<void>>('textAreaTarget');
  public post = input.required<Post>();
  public postEdit: PostEdit = {
    title: '',
    content: '',
  };
  @Output() showEdit = new EventEmitter<boolean>();
  @ViewChild('textAreaTarget') editPost: ElementRef | undefined;

  constructor() {
    effect(() => {
      this.r2.setStyle(
        this.textAreaTarget().nativeElement,
        'height',
        (this.textAreaTarget().nativeElement as any).scrollHeight + 'px'
      );
    });
  }

  ngAfterViewInit() {
    if (this.editPost) {
      this.editPost.nativeElement.focus();
    }
  }

  ngOnInit() {
      this.postEdit.content = this.post().content;
      this.postEdit.title = this.post().title;
  }

  submitEditPost() {
    this.store.dispatch(
      postsActions.editPost({ postId: this.post().id, postEdit: this.postEdit })
    );
    this.showEdit.emit(false);
  }

  cancelEditPost() {
    this.showEdit.emit(false);
  }
}
