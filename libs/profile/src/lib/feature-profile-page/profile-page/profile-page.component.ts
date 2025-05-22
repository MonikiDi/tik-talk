import { Component, inject } from '@angular/core';
import { ProfileHeaderComponent } from '../../ui/profile-header/profile-header.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { AboutMeComponent } from '@tt/common-ui';
import { TasksComponent } from '@tt/common-ui';

import { PostComponent, PostFeedComponent, PostService } from '@tt/posts';
import { SvgIconComponent } from '@tt/common-ui';
import { ProfileService } from '../../data/services/profile.service';
import { SubscribersComponent } from '@tt/subscribers';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    AsyncPipe,
    PostFeedComponent,
    AboutMeComponent,
    SubscribersComponent,
    TasksComponent,
    SvgIconComponent,
    RouterLink,
    PostComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  private readonly profileService = inject(ProfileService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  public profile$ = this.route.params.pipe(
    switchMap(({ id }) => {
      return this.profileService.getAccount(id);
    })
  );
  async sendMessage(userId: number) {
    this.router.navigate(['/chats', 'new'], { queryParams: { userId } });
  }
}
