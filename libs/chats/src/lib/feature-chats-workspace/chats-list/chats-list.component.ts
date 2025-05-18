import { Component, computed, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SvgIconComponent } from '@tt/common-ui';
import { ChatsBtnComponent } from '../chats-btn/chats-btn.component';
import { ChatsService } from '../../data/services/chats.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  switchMap,
  timer,
} from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

const TIMEOUT = 10000;
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
export class ChatsListComponent {
  private readonly chatsService = inject(ChatsService);
  filterChatsControl = new FormControl('');

  public chats = toSignal(
    timer(0, TIMEOUT).pipe(
      switchMap(() => {
        return this.chatsService.getMyChat();
      })
    ),
    { initialValue: [] }
  );

  private readonly filterChatsControlValue = toSignal(
    this.filterChatsControl.valueChanges,
    { initialValue: this.filterChatsControl.value }
  );

  public filterChats = computed(() => {
    const inputValue = this.filterChatsControlValue();
    return this.chats().filter((chat) => {
      return `${chat.userFrom.firstName} ${chat.userFrom.lastName}`
        .toLowerCase()
        .includes(inputValue!.toLowerCase() ?? '');
    });
  });
}
