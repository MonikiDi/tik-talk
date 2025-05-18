import { Component, HostBinding, input, signal } from '@angular/core';
import { Message } from '../../../../../data/interfaces/chats.interface';
import { AvatarCircleComponent } from '../../../../../../../../../libs/common-ui/src/lib/common-ui/components/avatar-circle/avatar-circle.component';
import { DataCreateAtPipe } from '../../../../../helpers/pipes/data-create-at.pipe';
import { DatePipe } from '@angular/common';
import { DateUtcPipe } from '../../../../../helpers/pipes/date-utc.pipe';

@Component({
  selector: 'app-chat-workspace-messages',
  standalone: true,
  imports: [AvatarCircleComponent, DataCreateAtPipe, DatePipe, DateUtcPipe],
  templateUrl: './chat-workspace-messages.component.html',
  styleUrl: './chat-workspace-messages.component.scss',
})
export class ChatWorkspaceMessagesComponent {
  message = input.required<Message>();

  @HostBinding('class.is-mine')
  get isMine() {
    return this.message().isMine;
  }
}
