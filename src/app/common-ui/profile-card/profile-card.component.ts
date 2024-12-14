import {Component, inject, Input} from '@angular/core';
import { Profile } from '../../data/interfaces/profile.interface';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';
import {SubscriberService} from '../../data/services/subscriber.service';

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

  onSubscriber(profileId:number) {
    this.subscriberService.onSubscriber(profileId).subscribe()
  }
}
