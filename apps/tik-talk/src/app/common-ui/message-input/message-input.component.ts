import {
  Component,
  effect,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  Renderer2,
  signal,
  viewChild,
} from '@angular/core';
import { AvatarCircleComponent } from '@tt/common-ui';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { SvgIconComponent } from '@tt/common-ui';
import { ProfileService } from '@tt/profile';

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [AvatarCircleComponent, FormsModule, NgIf, SvgIconComponent],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.scss',
})
export class MessageInputComponent {
  r2 = inject(Renderer2);
  private readonly textAreaTarget =
    viewChild.required<ElementRef<void>>('textAreaTarget');
  me = inject(ProfileService).me;
  postText = signal('');

  @Input() public set data(value: string) {
    this.postText.set(value);
  }

  @Output() dataChange = new EventEmitter<string>();

  onDataChange(value: string) {
    this.dataChange.emit(value);
  }

  @Output() onSubmit = new EventEmitter<string>();

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
