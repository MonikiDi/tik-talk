import { Component, input } from '@angular/core';
import { AvatarCircleComponent } from '@tt/common-ui';
import {
  LastMessageRes,
} from '@tt/interfaces/chats/chats.interface';
import { DataCreateAtPipe } from '@tt/shared';

@Component({
  selector: 'button[chats]',
  standalone: true,
  imports: [AvatarCircleComponent, DataCreateAtPipe],
  templateUrl: './chats-btn.component.html',
  styleUrl: './chats-btn.component.scss',
})
export class ChatsBtnComponent {
  chat = input<LastMessageRes>();
}
