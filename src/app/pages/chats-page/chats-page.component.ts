import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ChatsListComponent} from './chats-list/chats-list.component';
import {ChatWorkspaceHeaderComponent} from "./chat-workspace/chat-workspace-header/chat-workspace-header.component";

@Component({
  selector: 'app-chats-page',
  standalone: true,
    imports: [
        RouterOutlet,
        ChatsListComponent,
        ChatWorkspaceHeaderComponent
    ],
  templateUrl: './chats-page.component.html',
  styleUrl: './chats-page.component.scss'
})
export class ChatsPageComponent {

}
