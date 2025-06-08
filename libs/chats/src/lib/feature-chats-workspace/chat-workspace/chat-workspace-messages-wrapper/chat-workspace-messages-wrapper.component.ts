import {
  AfterViewInit,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  OnInit,
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
import { firstValueFrom, switchMap, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { ChatsService } from '@tt/data-access';

const TIMEOUT = 5000;

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
export class ChatWorkspaceMessagesWrapperComponent
  implements OnInit, AfterViewInit
{
  destroyRef = inject(DestroyRef);
  chatsService = inject(ChatsService);
  r2 = inject(Renderer2);
  hostElement = inject(ElementRef);
  parentData = signal('');
  chat = input.required<Chat>();
  messages = this.chatsService.activeChatMessages;

  constructor() {
    effect(() => {
      this.messages();
      this.scrollToBottom();
    });
  }

  filterDayMessages = computed(() => {
    return chatByDay(this.messages());
  });

  // Функция для автоматического скролла вниз
  scrollToBottom() {
    if (this.hostElement) {
      this.hostElement.nativeElement.scrollTo({
        top: this.hostElement.nativeElement.scrollHeight,
      });
    }
  }

  ngOnInit() {
    timer(0, TIMEOUT)
      .pipe(
        switchMap(() => {
          return this.chatsService.getChatById(this.chat().id);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
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
    // console.log(height);
  }

  async onSendMessage(messageText: string) {
    const result = normalizationText(messageText);
    assertNonNullish(result, '');

    if (this.parentData() === '' || result === '') {
      this.parentData.set('');
      return;
    }

    this.chatsService.wsAdapter.sendMessage(result, this.chat().id);
    // await firstValueFrom(
    //   this.chatsService.sendMessage(this.chat().id, messageText)
    // );
    await firstValueFrom(this.chatsService.getChatById(this.chat().id));
    this.parentData.set('');
  }
}
