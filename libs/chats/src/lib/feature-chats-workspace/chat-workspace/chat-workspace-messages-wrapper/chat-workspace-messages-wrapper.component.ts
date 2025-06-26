import {
  AfterViewInit,
  Component,
  computed,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  Renderer2,
  signal,
} from '@angular/core';
import { ChatWorkspaceMessagesComponent } from './chat-workspace-messages/chat-workspace-messages.component';
import { MessageInputComponent } from '../../../ui/message-input/message-input.component';
import {
  assertNonNullish,
  chatByDay,
  DateUtcPipe,
  Debounce,
  normalizationText,
} from '@tt/shared';
import { Chat } from '@tt/interfaces/chats/chats.interface';
import { DatePipe } from '@angular/common';
import { ChatsService } from '@tt/data-access';
import { Profile } from '@tt/interfaces/profile';

@Component({
  selector: 'app-chat-workspace-messages-wrapper',
  standalone: true,
  imports: [
    ChatWorkspaceMessagesComponent,
    MessageInputComponent,
    DateUtcPipe,
    DatePipe,
  ],
  templateUrl: './chat-workspace-messages-wrapper.component.html',
  styleUrl: './chat-workspace-messages-wrapper.component.scss',
})
export class ChatWorkspaceMessagesWrapperComponent implements AfterViewInit {
  private readonly hostElement = inject(ElementRef);
  private readonly chatsService = inject(ChatsService);
  private readonly r2 = inject(Renderer2);
  public readonly chat = input.required<Chat>();
  public readonly profileMe = input.required<Profile>();
  public readonly filterDayMessages = computed(() => {
    return chatByDay(this.chat().messages);
  });
  public readonly parentData = signal('');

  constructor() {
    effect(() => {
      this.scrollToBottom();
    });
  }

  scrollToBottom() {
    if (this.hostElement) {
      this.hostElement.nativeElement.scrollTo({
        top: this.hostElement.nativeElement.scrollHeight,
      });
    }
  }

  ngAfterViewInit() {
    this.resizeFeed();
  }

  @Debounce(20)
  @HostListener('window: resize')
  onWindowResize() {
    this.resizeFeed();
  }

  public resizeFeed() {
    const { top } = this.hostElement.nativeElement.getBoundingClientRect();
    const height = window.innerHeight - top - 48;
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }

  async onSendMessage(messageText: string) {
    const result = normalizationText(messageText);
    assertNonNullish(result, '');
    if (this.parentData() === '' || result === '') {
      this.parentData.set('');
      return;
    }
    this.chatsService.wsAdapter.sendMessage(result, this.chat().id);
    this.parentData.set('');
  }
}
