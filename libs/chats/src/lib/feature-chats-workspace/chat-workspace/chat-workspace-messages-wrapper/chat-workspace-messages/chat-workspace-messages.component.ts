import { ChangeDetectionStrategy, Component, HostBinding, input } from '@angular/core';
import { Message } from '@tt/interfaces/chats/chats.interface';
import { AvatarCircleComponent } from '@tt/common-ui';
import { DateUtcPipe } from '@tt/shared';
import { DatePipe } from '@angular/common';
import { Profile } from '@tt/interfaces/profile';

@Component({
  selector: 'app-chat-workspace-messages',
  standalone: true,
  imports: [AvatarCircleComponent, DatePipe, DateUtcPipe],
  templateUrl: './chat-workspace-messages.component.html',
  styleUrl: './chat-workspace-messages.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWorkspaceMessagesComponent {
  public readonly message = input.required<Message>();
  public readonly user = input.required<Profile>();
  public readonly isMyMessage = input.required<boolean>();

  @HostBinding('class.is-mine')
  get isMine() {
    return this.isMyMessage();
  }
}
