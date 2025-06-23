import {
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  Renderer2,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SvgIconComponent } from '@tt/common-ui';
import { ChatsBtnComponent } from '../chats-btn/chats-btn.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Debounce } from '@tt/shared';
import { Store } from '@ngrx/store';
import { chatsActions, selectLastMessageChatMap } from '@tt/data-access';

@Component({
  selector: 'app-chats-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SvgIconComponent,
    ChatsBtnComponent,
    RouterLinkActive,
    RouterLink,
  ],
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.scss',
})
export class ChatsListComponent implements OnInit {
  public hostElement = inject(ElementRef);
  public r2 = inject(Renderer2);
  public store = inject(Store);

  filterChatsControl = new FormControl('');

  public chats = this.store.selectSignal(selectLastMessageChatMap);

  private readonly filterChatsControlValue = toSignal(
    this.filterChatsControl.valueChanges,
    { initialValue: this.filterChatsControl.value }
  );

  public filterChats = computed(() => {
    const inputValue = this.filterChatsControlValue();
    return this.chats()
      .filter((chat) => {
        return `${chat.userFrom.firstName} ${chat.userFrom.lastName}`
          .toLowerCase()
          .includes(inputValue!.toLowerCase() ?? '');
      })
      .slice()
      .sort((a, b) => {
        return a.createdAt > b.createdAt ? -1 : 1;
      });
  });

  ngOnInit() {
    this.store.dispatch(chatsActions.loadLastMessageChatMap());
  }

  // Скролл чатов
  ngAfterViewInit() {
    this.resizeFeed();
  }

  // 2 Метод c Декоратором
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
}
