import {
  ChangeDetectorRef,
  Component,
  effect, ElementRef,
  EventEmitter,
  HostBinding,
  inject, Input,
  input, model, ModelSignal, output,
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
import {firstValueFrom, retry} from "rxjs";
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
  r2 = inject(Renderer2)
  private readonly textAreaTarget = viewChild.required<ElementRef<void>>('textAreaTarget');
  profile = inject(ProfileService).me
  border = input<'solid' | 'dashed'>('solid')
  placeholder = input<string>('')
  postText = signal('')

  @Input() public set data(value: string) {
    this.postText.set(value)
  }
  @Output() dataChange = new EventEmitter<string>()

  onDataChange(value:string) {
    this.dataChange.emit(value)
  }

  @Output() onSubmit = new EventEmitter<string>()

  @HostBinding('class.comment')
  get isComment() {
    return this.border() === 'dashed'
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

}
