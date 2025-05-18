import { Component, inject, signal } from '@angular/core';
import { ChatWorkspaceHeaderComponent } from './chat-workspace-header/chat-workspace-header.component';
import { ChatWorkspaceMessagesWrapperComponent } from './chat-workspace-messages-wrapper/chat-workspace-messages-wrapper.component';
import { MessageInputComponent } from '../../../common-ui/message-input/message-input.component';
import { ActivatedRoute } from '@angular/router';
import { ChatsService } from '../../../data/services/chats.service';
import { firstValueFrom, switchMap, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { normalizationText } from '../../../../../../../libs/shared/src/lib/utils/normalization-text';
import { assertNonNullish } from '../../../../../../../libs/shared/src/lib/utils/assert-non-nullish';
import { PostInputComponent } from '../../../../../../../libs/posts/src/lib/ui/post-input/post-input.component';
import { ProfileService } from '../../../../../../../libs/profile/src/lib/data/services/profile.service';

@Component({
  selector: 'app-chat-workspace',
  standalone: true,
  imports: [
    ChatWorkspaceHeaderComponent,
    ChatWorkspaceMessagesWrapperComponent,
    AsyncPipe,
  ],
  templateUrl: './chat-workspace.component.html',
  styleUrl: './chat-workspace.component.scss',
})
export class ChatWorkspaceComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly chatsService = inject(ChatsService);

  activeChats$ = this.route.params.pipe(
    switchMap(({ id }) => this.chatsService.getChatById(id))
  );
}
