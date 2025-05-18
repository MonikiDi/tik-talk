import { Component, input } from '@angular/core';
import { AvatarCircleComponent } from '@tt/common-ui';
import { Profile } from '../../../../../interfaces/src/lib/profile/profile.interface';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [AvatarCircleComponent],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
})
export class ProfileHeaderComponent {
  profile = input<Profile>();
}
