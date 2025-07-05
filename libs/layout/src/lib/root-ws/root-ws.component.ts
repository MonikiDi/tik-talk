import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { ChatsService } from '@tt/data-access';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'root-ws',
  standalone: true,
  imports: [],
  templateUrl: './root-ws.component.html',
  styleUrl: './root-ws.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RootWsComponent implements OnInit {
  private readonly chatService = inject(ChatsService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.chatService
      .connectWs()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(console.log);
  }
}
