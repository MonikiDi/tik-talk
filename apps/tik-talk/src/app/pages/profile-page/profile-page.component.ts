import { Component, inject } from '@angular/core';
import { ProfileHeaderComponent } from '../../common-ui/profile-header/profile-header.component';
import { ProfileService } from '../../data/services/profile.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { firstValueFrom, switchMap, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { PostFeedComponent } from '../../modules/post/componets/post-feed/post-feed.component';
import { AboutMeComponent } from '../../shared/componets/about-me/about-me.component';
import { SubscribersComponent } from '../../shared/componets/subscribers/subscribers.component';
import { TasksComponent } from '../../shared/componets/tasks/tasks.component';
import { SvgIconComponent } from '../../common-ui/svg-icon/svg-icon.component';
import { ChatsService } from '../../data/services/chats.service';

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
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  private readonly profileService = inject(ProfileService);
  private readonly chatsService = inject(ChatsService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  public profile$ = this.route.params.pipe(
    switchMap(({ id }) => {
      return this.profileService.getAccount(id);
    })
  );

  async sendMessage(userId: number) {
    await firstValueFrom(this.chatsService.createChat(userId)).then((res) => {
      this.router.navigate(['/chats', res.id]);
    });
  }
}
