import { Component, inject, input, Input } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ImgUrlPipe } from '../../../helpers/pipes/img-url.pipe';
import { RouterLink } from '@angular/router';
import { ProfileService } from '../../../data/services/profile.service';
import { Profile } from '../../../data/interfaces/profile.interface';

const SUBSCRIBER_COUNTER = 5;

@Component({
  selector: 'app-subscribers',
  standalone: true,
  imports: [AsyncPipe, ImgUrlPipe, RouterLink],
  templateUrl: './subscribers.component.html',
  styleUrl: './subscribers.component.scss',
})
export class SubscribersComponent {
  profileService = inject(ProfileService);
  subscribers$ =
    this.profileService.getSubscribersShortList(SUBSCRIBER_COUNTER);
  profile = input.required<Profile>();
}
