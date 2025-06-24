import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatsListComponent } from '../chats-list/chats-list.component';
import { ChatsService } from '@tt/data-access';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-chats-page',
  standalone: true,
  imports: [RouterOutlet, ChatsListComponent],
  templateUrl: './chats-page.component.html',
  styleUrl: './chats-page.component.scss',
})
export class ChatsPageComponent implements OnInit {
  private readonly chatService = inject(ChatsService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.chatService
      .connectWs()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(console.log);
  }
}
