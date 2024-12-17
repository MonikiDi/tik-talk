import {
  Component, computed,
  DestroyRef,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  Renderer2,
  signal,
  viewChild
} from '@angular/core';
import {ChatWorkspaceMessagesComponent} from './chat-workspace-messages/chat-workspace-messages.component';
import {MessageInputComponent} from '../../../../common-ui/message-input/message-input.component';
import {normalizationText} from '../../../../shared/utils/normalization-text';
import {assertNonNullish} from '../../../../shared/utils/assert-non-nullish';
import {ChatsService} from '../../../../data/services/chats.service';
import {Chat, Message} from '../../../../data/interfaces/chats.interface';
import {firstValueFrom, Subject, switchMap, takeUntil, tap, timer} from 'rxjs';
import {Debounce} from '../../../../shared/decorators/debounce.decorator';
import {chatByDay} from '../../../../shared/utils/chat-by-day';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FilterMessages} from '../../../../data/interfaces/filterDayMessages.interface';


const TIMEOUT = 10000;


@Component({
  selector: 'app-chat-workspace-messages-wrapper',
  standalone: true,
  imports: [
    ChatWorkspaceMessagesComponent,
    MessageInputComponent,
  ],
  templateUrl: './chat-workspace-messages-wrapper.component.html',
  styleUrl: './chat-workspace-messages-wrapper.component.scss'
})
export class ChatWorkspaceMessagesWrapperComponent {
  public parentData = signal('')
  chatsService = inject(ChatsService)
  chat = input.required<Chat>()
  destroyRef = inject(DestroyRef);
  messages = this.chatsService.activeChatMessages
  public r2 = inject(Renderer2);
  public hostElement = inject(ElementRef);
  filterDayMessages = computed(() => {
    return chatByDay(this.messages())
  })

  ngOnInit() {
    timer(0, TIMEOUT)
      .pipe(
        switchMap(() => {
          return   this.chatsService.getChatById(this.chat().id)
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  ngAfterViewInit() {
    this.resizeFeed()
  }

  @Debounce(20)
  @HostListener('window: resize')
  onWindowResize() {
    this.resizeFeed()
  }

  public resizeFeed() {
    const {top} = this.hostElement.nativeElement.getBoundingClientRect();
    const height = window.innerHeight - top - 48;
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`)
    console.log(height);
  }


  async onSendMessage(messageText: string) {
    const result = normalizationText(messageText);
    assertNonNullish(result, '')

    if (this.parentData() === '' || result === '') {
      this.parentData.set('')
      return
    }
    await firstValueFrom(this.chatsService.sendMessage(this.chat().id, messageText))
    await firstValueFrom(this.chatsService.getChatById(this.chat().id))
    this.parentData.set('')
  }

}
