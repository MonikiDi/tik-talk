import {
  Component,
  computed,
  DestroyRef,
  ElementRef,
  HostListener,
  inject,
  input,
  Renderer2,
  signal,
} from '@angular/core';
import { ChatWorkspaceMessagesComponent } from './chat-workspace-messages/chat-workspace-messages.component';
import { MessageInputComponent } from '../../../ui/message-input/message-input.component';
import { normalizationText } from '@tt/shared';
import { assertNonNullish } from '@tt/shared';
import { ChatsService } from '../../../data/services/chats.service';
import { Chat } from '@tt/interfaces/chats/chats.interface';
import {
  firstValueFrom,
  switchMap,
  timer,
} from 'rxjs';
import { Debounce } from '@tt/shared';
import { chatByDay } from '../../../../../../shared/src/lib/utils/chat-by-day';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DateUtcPipe } from '@tt/shared';
import { DatePipe } from '@angular/common';

const TIMEOUT = 10000;

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
export class ChatWorkspaceMessagesWrapperComponent {
  public parentData = signal('');
  chatsService = inject(ChatsService);
  chat = input.required<Chat>();
  destroyRef = inject(DestroyRef);
  messages = this.chatsService.activeChatMessages;
  public r2 = inject(Renderer2);
  public hostElement = inject(ElementRef);

  filterDayMessages = computed(() => {
    return chatByDay(this.messages());
  });

  ngOnInit() {
    timer(0, TIMEOUT)
      .pipe(
        switchMap(() => {
          return this.chatsService.getChatById(this.chat().id);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
    document.addEventListener('DOMContentLoaded', this.scrollToBottom);
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
    console.log(height);
  }

  async onSendMessage(messageText: string) {
    const result = normalizationText(messageText);
    assertNonNullish(result, '');

    if (this.parentData() === '' || result === '') {
      this.parentData.set('');
      return;
    }
    await firstValueFrom(
      this.chatsService.sendMessage(this.chat().id, messageText)
    );
    await firstValueFrom(this.chatsService.getChatById(this.chat().id));
    this.parentData.set('');
  }
  // Функция для автоматического скролла вниз
  scrollToBottom() {
    const chatContainer = document.getElementById('message-wrapper');
    // @ts-ignore
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
}
