import { Component, HostBinding, input, signal } from '@angular/core';
import { Message } from '@tt/interfaces/chats/chats.interface';
import { AvatarCircleComponent } from '@tt/common-ui';
import { DataCreateAtPipe } from '@tt/shared';
import { DatePipe } from '@angular/common';
import { DateUtcPipe } from '@tt/shared';

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
