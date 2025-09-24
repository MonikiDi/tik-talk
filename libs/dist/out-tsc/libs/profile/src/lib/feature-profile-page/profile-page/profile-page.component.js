import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { ProfileHeaderComponent } from '../../ui/profile-header/profile-header.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map, of, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { AboutMeComponent, SvgIconComponent, TasksComponent } from '@tt/common-ui';
import { SubscribersComponent } from '@tt/subscribers';
import { Store } from '@ngrx/store';
import { PostFeedComponent } from '@tt/posts';
import { postsActions, profileActions, selectPostsUserById, selectUser } from '@tt/data-access';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { SubscriptionsComponent } from '@tt/subscriptions';
let ProfilePageComponent = class ProfilePageComponent {
    activatedRoute = inject(ActivatedRoute);
    destroyRef = inject(DestroyRef);
    router = inject(Router);
    store = inject(Store);
    profile$ = this.store.select(selectUser);
    posts = toSignal(this.activatedRoute.params.pipe(switchMap((params) => {
        return !params?.['id']
            ? of(undefined)
            : this.store.select(selectPostsUserById(params?.['id']));
    })));
    ngOnInit() {
        this.activatedRoute.params
            .pipe(map((params) => {
            return params?.['id'];
        }), takeUntilDestroyed(this.destroyRef))
            .subscribe((userId) => {
            if (userId) {
                this.store.dispatch(profileActions.loadUserId({ userId: userId }));
                this.store.dispatch(postsActions.loadPostsUserId({ userId: userId }));
            }
            else {
                throw new Error('not fount user id');
            }
        });
    }
    async sendMessage(userId) {
        this.router.navigate(['/chats', 'new'], { queryParams: { userId } });
    }
};
ProfilePageComponent = __decorate([
    Component({
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
            SubscriptionsComponent
        ],
        templateUrl: './profile-page.component.html',
        styleUrl: './profile-page.component.scss',
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], ProfilePageComponent);
export { ProfilePageComponent };
//# sourceMappingURL=profile-page.component.js.map