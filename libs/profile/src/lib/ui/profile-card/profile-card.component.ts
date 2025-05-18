import { Component, inject, Input } from '@angular/core';
import { ImgUrlPipe } from '@tt/common-ui';
import { Profile } from '../../../../../interfaces/src/lib/profile/profile.interface';
import {SubscriberService} from '@tt/subscribers';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [ImgUrlPipe],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {
  subscriberService = inject(SubscriberService);
  @Input() profile!: Profile;
  @Input() disabled: boolean = true;

  onSubscriber(profileId: number) {
    this.subscriberService.onSubscriber(profileId).subscribe();
  }
}
