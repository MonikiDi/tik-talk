import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { ProfileHeaderComponent } from '../../ui/profile-header/profile-header.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map, Observable, of, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import {
  AboutMeComponent,
  SvgIconComponent,
  TasksComponent,
} from '@tt/common-ui';
import { SubscribersComponent } from '@tt/subscribers';
import { Store } from '@ngrx/store';
import { PostFeedComponent } from '@tt/posts';
import {
  postsActions,
  profileActions,
  selectPostsUserById,
  selectUser,
} from '@tt/data-access';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Profile } from '@tt/interfaces/profile';

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
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly store = inject(Store);
  public profile$: Observable<Profile | undefined> =
    this.store.select(selectUser);
  public posts = toSignal(
    this.activatedRoute.params.pipe(
      switchMap((params) => {
        return !params?.['id']
          ? of(undefined)
          : this.store.select(selectPostsUserById(params?.['id']));
      })
    )
  );

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        map((params) => {
          return params?.['id'];
        }),
        takeUntilDestroyed(this.destroyRef)
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
