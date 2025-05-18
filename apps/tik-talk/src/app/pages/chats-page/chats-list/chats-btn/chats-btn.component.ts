import { Component, effect, input } from '@angular/core';
import { AvatarCircleComponent } from '../../../../../../../../libs/common-ui/src/lib/common-ui/components/avatar-circle/avatar-circle.component';
import {
  Chat,
  LastMessageRes,
} from '../../../../data/interfaces/chats.interface';
import { DataCreateAtPipe } from '../../../../helpers/pipes/data-create-at.pipe';

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
