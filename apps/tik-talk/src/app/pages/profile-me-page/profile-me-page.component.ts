import {Component, effect, inject} from '@angular/core';
import { ProfileService } from '@tt/profile';
import { RouterLink } from '@angular/router';
import { ProfileHeaderComponent } from '../../common-ui/profile-header/profile-header.component';
import { SvgIconComponent } from '@tt/common-ui';
import { PostFeedComponent } from '@tt/posts';
import { SubscribersComponent } from '../../shared/componets/subscribers/subscribers.component';
import { TasksComponent } from '../../shared/componets/tasks/tasks.component';
import { AboutMeComponent } from '../../shared/componets/about-me/about-me.component';

@Component({
  selector: 'app-profile-me-page',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    RouterLink,
    SvgIconComponent,
    PostFeedComponent,
    SubscribersComponent,
    TasksComponent,
    AboutMeComponent,
  ],
  templateUrl: './profile-me-page.component.html',
  styleUrl: './profile-me-page.component.scss',
})
export class ProfileMePageComponent {
  private readonly profileService = inject(ProfileService);
  public me = this.profileService.me;
}
