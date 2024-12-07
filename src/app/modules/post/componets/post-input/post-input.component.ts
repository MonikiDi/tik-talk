import {
  ChangeDetectorRef,
  Component,
  effect, ElementRef,
  EventEmitter,
  HostBinding,
  inject,
  input,
  Output,
  Renderer2,
  signal, TemplateRef,
  viewChild
} from '@angular/core';
import {AvatarCircleComponent} from '../../../../common-ui/avatar-circle/avatar-circle.component';
import {ProfileService} from '../../../../data/services/profile.service';
import {NgIf} from '@angular/common';
import {SvgIconComponent} from '../../../../common-ui/svg-icon/svg-icon.component';
import {PostService} from "../../ service/post.service";
import {FormsModule} from "@angular/forms";
import {firstValueFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-post-input',
  standalone: true,
  imports: [
    AvatarCircleComponent,
    NgIf,
    SvgIconComponent,
    FormsModule
  ],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss'
})
export class PostInputComponent {
  postService = inject(PostService)
  r2 = inject(Renderer2)

  private readonly textAreaTarget = viewChild.required<ElementRef<void>>('textAreaTarget');

  profile = inject(ProfileService).me
  isCommentInput = input(false)
  postId = input<number>(0)

  postText = signal('')

  @Output() created = new EventEmitter()

  @HostBinding('class.comment')
  get isComment() {
    return this.isCommentInput()
  }

  constructor() {
    effect(() => {
      const textValue = this.postText();

      if (textValue === '') {
        this.r2.setStyle(this.textAreaTarget().nativeElement, 'height', 'auto');
      } else {
        this.r2.setStyle(this.textAreaTarget().nativeElement, 'height', (this.textAreaTarget().nativeElement as any).scrollHeight + 'px');
      }
    });
  }

  onCreatePost() {
    const textValue = this.postText();

    if (textValue.replace(/\n+/g, '\n') === '\n') this.postText.set('')

    if (!this.postText()) return

    if (this.isCommentInput()) {
      firstValueFrom(this.postService.createComment({
        text: this.postText(),
        authorId: this.profile()!.id,
        postId: this.postId(),
        commentId: 0,
      })).then(() => {
        this.postText.set('')
        this.created.emit()
      })
      return;
    }

    firstValueFrom(this.postService.createPost({
      title: 'Клевый пост',
      content: this.postText(),
      authorId: this.profile()!.id,
      communityId: 0,
    })).then(() => {
      this.postText.set('')
    })
  }
}
