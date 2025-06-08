import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatsListComponent } from '../chats-list/chats-list.component';
import { ChatsService } from '../../data/services/chats.service';

@Component({
  selector: 'app-chats-page',
  standalone: true,
  imports: [RouterOutlet, ChatsListComponent],
  templateUrl: './chats-page.component.html',
  styleUrl: './chats-page.component.scss',
})
export class ChatsPageComponent implements OnInit {
  #chatService = inject(ChatsService);

  ngOnInit() {
    this.#chatService.connectWs().subscribe();
  }
}
