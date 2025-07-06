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
import { SubscriberService } from '@tt/data-access';

const SUBSCRIBER_COUNTER = 10;

@Component({
  selector: 'app-subscribers',
  standalone: true,
  imports: [AsyncPipe, ImgUrlPipe, RouterLink],
  templateUrl: './subscribers.component.html',
  styleUrl: './subscribers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscribersComponent {
  subcriberService = inject(SubscriberService);

  subscribers$ =
    this.subcriberService.getSubscribersShortList(SUBSCRIBER_COUNTER);
  profile = input.required<Profile>();
}
