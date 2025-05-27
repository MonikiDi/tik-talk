import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProfileHeaderComponent } from '../../ui/profile-header/profile-header.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { AboutMeComponent } from '@tt/common-ui';
import { TasksComponent } from '@tt/common-ui';

import { PostFeedComponent } from '@tt/posts';
import { SvgIconComponent } from '@tt/common-ui';
import { SubscribersComponent } from '@tt/subscribers';
import { Store } from '@ngrx/store';
import { profileActions, selectUser } from '../../data';
import { Profile } from '@tt/interfaces/profile';

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
        } else {
          throw new Error('not fount user id');
        }
      });
  }

  async sendMessage(userId: number) {
    this.router.navigate(['/chats', 'new'], { queryParams: { userId } });
  }
}
