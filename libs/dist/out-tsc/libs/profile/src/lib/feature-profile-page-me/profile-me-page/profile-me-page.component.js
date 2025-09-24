import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfileHeaderComponent } from '../../ui/profile-header/profile-header.component';
import { AboutMeComponent, SvgIconComponent, TasksComponent } from '@tt/common-ui';
import { SubscribersComponent } from '@tt/subscribers';
import { Store } from '@ngrx/store';
import { postsActions, selectPostsUserById, selectProfileMe } from '@tt/data-access';
import { SubscriptionsComponent } from '@tt/subscriptions';
import { of, switchMap } from 'rxjs';
import { PostFeedComponent } from '@tt/posts';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
let ProfileMePageComponent = class ProfileMePageComponent {
    store = inject(Store);
    destroyRef = inject(DestroyRef);
    me = this.store.selectSignal(selectProfileMe);
    me2 = this.store.select(selectProfileMe);
    posts = signal([]);
    ngOnInit() {
        this.me2.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((me) => {
            if (me) {
                this.store.dispatch(postsActions.loadPostsUserId({ userId: Number(this.me()?.id) }));
            }
        });
        this.me2
            .pipe(switchMap((me) => {
            if (me) {
                return this.store.select(selectPostsUserById(me.id));
            }
            return of([]);
        }), takeUntilDestroyed(this.destroyRef))
            .subscribe((posts) => {
            this.posts.set(posts);
        });
    }
};
ProfileMePageComponent = __decorate([
    Component({
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
], ProfileMePageComponent);
export { ProfileMePageComponent };
//# sourceMappingURL=profile-me-page.component.js.map