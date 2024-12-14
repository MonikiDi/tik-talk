import {Component, HostBinding, input, signal} from '@angular/core';
import {Message} from '../../../../../data/interfaces/chats.interface';
import {AvatarCircleComponent} from '../../../../../common-ui/avatar-circle/avatar-circle.component';
import {DataCreateAtPipe} from '../../../../../helpers/pipes/data-create-at.pipe';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-chat-workspace-messages',
  standalone: true,
  imports: [
    AvatarCircleComponent,
    DataCreateAtPipe,
    DatePipe
  ],
  templateUrl: './chat-workspace-messages.component.html',
  styleUrl: './chat-workspace-messages.component.scss'
})
export class ChatWorkspaceMessagesComponent {
  message = input.required<Message>()

  @HostBinding('class.is-mine')
  get isMine() {
    return this.message().isMine
  }
}
