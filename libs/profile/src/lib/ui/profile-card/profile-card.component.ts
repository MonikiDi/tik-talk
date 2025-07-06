import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { ImgUrlPipe } from '@tt/common-ui';
import { Profile } from '@tt/interfaces/profile';
import { SubscriberService } from '@tt/data-access';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [ImgUrlPipe, NgClass, RouterLink],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileCardComponent {
  subscriberService = inject(SubscriberService);
  @Input() profile!: Profile;
  @Input() disabled: boolean = true;
  public isActive = true;

  toggleSubscriber(event: Event, profileId: number) {
    event.stopPropagation();
    this.isActive = !this.isActive;
    if (this.isActive) {
      this.onSubscriber(profileId);
    } else {
      this.onUnsubscribe(profileId);
    }
  }

  onSubscriber(profileId: number) {
    this.subscriberService.onSubscriber(profileId).subscribe();
  }

  onUnsubscribe(profileId: number) {
    this.subscriberService.onUnsubscribe(profileId).subscribe();
  }
}
