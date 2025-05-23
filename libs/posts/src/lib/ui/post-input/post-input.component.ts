import {
  Component,
  effect,
  ElementRef,
  EventEmitter,
  HostBinding,
  inject,
  Input,
  input,
  Output,
  Renderer2,
  signal,
  viewChild,
} from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {AvatarCircleComponent, SvgIconComponent} from '@tt/common-ui';
import {GlobalStoreService} from '@tt/shared';

@Component({
  selector: 'app-post-input',
  standalone: true,
  imports: [AvatarCircleComponent, NgIf, SvgIconComponent, FormsModule],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss',
})
export class PostInputComponent {
  r2 = inject(Renderer2);
  private readonly textAreaTarget =
    viewChild.required<ElementRef<void>>('textAreaTarget');
  profile = inject(GlobalStoreService).me;
  border = input<'solid' | 'dashed'>('solid');
  placeholder = input<string>('');
  postText = signal('');


  @Input() public set data(value: string) {
    this.postText.set(value);
  }
  @Output() dataChange = new EventEmitter<string>();

  onDataChange(value: string) {
    this.dataChange.emit(value);
  }

  @Output() onSubmit = new EventEmitter<string>();

  @HostBinding('class.comment')
  get isComment() {
    return this.border() === 'dashed';
  }

  constructor() {
    effect(() => {
      const textValue = this.postText();

      if (textValue === '') {
        this.r2.setStyle(this.textAreaTarget().nativeElement, 'height', 'auto');
      } else {
        this.r2.setStyle(
          this.textAreaTarget().nativeElement,
          'height',
          (this.textAreaTarget().nativeElement as any).scrollHeight + 'px'
        );
      }
    });
  }
}
