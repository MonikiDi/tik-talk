import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ProfileHeaderComponent } from '../../ui/profile-header/profile-header.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import {
  AboutMeComponent,
  SvgIconComponent,
  TasksComponent,
} from '@tt/common-ui';
import { SubscribersComponent } from '@tt/subscribers';
import { Store } from '@ngrx/store';
import { PostFeedComponent } from '@tt/posts';
import { postsActions, profileActions, selectUser } from '@tt/data-access';
import { SubscriptionsComponent } from '@tt/subscriptions';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    AsyncPipe,
    AboutMeComponent,
    PostFeedComponent,
    SubscribersComponent,
    TasksComponent,
    SvgIconComponent,
    RouterLink,
    SubscriptionsComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  store = inject(Store);
  public profile$ = this.store.select(selectUser);

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        map((params) => {
          return params?.['id'];
        })
      )
      .subscribe((userId) => {
        if (userId) {
          this.store.dispatch(profileActions.loadUserId({ userId: userId }));
          this.store.dispatch(postsActions.loadPostsUserId({ userId: userId }));
        } else {
          throw new Error('not fount user id');
        }
      });
  }

  async sendMessage(userId: number) {
    this.router.navigate(['/chats', 'new'], { queryParams: { userId } });
  }
}
