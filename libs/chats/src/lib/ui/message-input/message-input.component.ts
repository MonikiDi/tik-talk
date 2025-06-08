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
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AvatarCircleComponent } from '@tt/common-ui';
import { SvgIconComponent } from '@tt/common-ui';
import { Store } from '@ngrx/store';
import { selectProfileMe } from '@tt/data-access';

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [AvatarCircleComponent, FormsModule, NgIf, SvgIconComponent],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.scss',
})
export class MessageInputComponent {
  private readonly store = inject(Store);
  r2 = inject(Renderer2);
  private readonly textAreaTarget =
    viewChild.required<ElementRef<void>>('textAreaTarget');
  me = this.store.selectSignal(selectProfileMe);
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
