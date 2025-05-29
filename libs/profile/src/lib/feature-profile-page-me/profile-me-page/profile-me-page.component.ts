import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfileHeaderComponent } from '../../ui/profile-header/profile-header.component';
import { SvgIconComponent } from '@tt/common-ui';
import { TasksComponent } from '@tt/common-ui';
import { AboutMeComponent } from '@tt/common-ui';
import { SubscribersComponent } from '@tt/subscribers';
import { Store } from '@ngrx/store';
import { selectProfileMe } from '../../data';
import { PostFeedComponent } from '@tt/posts';

@Component({
  selector: 'app-profile-me-page',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    RouterLink,
    SvgIconComponent,
    SubscribersComponent,
    TasksComponent,
    AboutMeComponent,
    PostFeedComponent,
  ],
  templateUrl: './profile-me-page.component.html',
  styleUrl: './profile-me-page.component.scss',
})
export class ProfileMePageComponent {
  store = inject(Store);
  public me = this.store.selectSignal(selectProfileMe);
}
