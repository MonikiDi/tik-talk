import {Component, inject} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {SvgIconComponent} from '../../../common-ui/svg-icon/svg-icon.component';
import {ChatsBtnComponent} from './chats-btn/chats-btn.component';
import {ChatsService} from '../../../data/services/chats.service';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-chats-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SvgIconComponent,
    AsyncPipe,
    ChatsBtnComponent,
  ],
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.scss'
})
export class ChatsListComponent {
 private readonly  chatsService = inject(ChatsService);

 chats$ = this.chatsService.getMyChat()

}
