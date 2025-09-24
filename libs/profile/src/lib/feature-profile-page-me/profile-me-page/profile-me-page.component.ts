import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, Signal, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfileHeaderComponent } from '../../ui/profile-header/profile-header.component';
import { AboutMeComponent, SvgIconComponent, TasksComponent } from '@tt/common-ui';
import { SubscribersComponent } from '@tt/subscribers';
import { Store } from '@ngrx/store';
import { postsActions, selectPostsUserById, selectProfileMe } from '@tt/data-access';
import { SubscriptionsComponent } from '@tt/subscriptions';
import { of, switchMap } from 'rxjs';
import { Post } from '@tt/interfaces/post';
import { PostFeedComponent } from '@tt/posts';
import { Profile } from '@tt/interfaces/profile';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    SubscriptionsComponent,
    PostFeedComponent
  ],
  templateUrl: './profile-me-page.component.html',
  styleUrl: './profile-me-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileMePageComponent implements OnInit {
  private readonly store = inject(Store);
  private destroyRef = inject(DestroyRef);
  public me: Signal<Profile | undefined> =
    this.store.selectSignal(selectProfileMe);

  public me2 = this.store.select(selectProfileMe);

  public posts = signal<Post[]>([]);

  ngOnInit() {
    this.me2.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((me) => {
      if (me) {
        this.store.dispatch(
          postsActions.loadPostsUserId({ userId: Number(this.me()?.id) })
        );
      }
    });

    this.me2
      .pipe(
        switchMap((me) => {
          if (me) {
            return this.store.select(selectPostsUserById(me.id));
          }
          return of([]);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((posts) => {
        this.posts.set(posts);
      });
  }
}
