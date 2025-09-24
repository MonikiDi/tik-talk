import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Profile } from '@tt/interfaces/profile';
import { ImgUrlPipe } from '@tt/common-ui';
import { SubscriptionsService } from '@tt/data-access';

const SUBSCRIBER_COUNTER = 100;

@Component({
  selector: 'app-subscriptions',
  standalone: true,
  imports: [AsyncPipe, ImgUrlPipe, RouterLink],
  templateUrl: './subscriptions.component.html',
  styleUrl: './subscriptions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscriptionsComponent {
  subscriptionsService = inject(SubscriptionsService);
  profile = input.required<Profile>();

  subscriptionsNumber$ = this.subscriptionsService.getSubscriptionsNumber();

  subscriptions$ =
    this.subscriptionsService.getSubscriptionsShortList(SUBSCRIBER_COUNTER);
}
