import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, input, signal, } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { assertNonNullish, DataCreateAtPipe, normalizationText, } from '@tt/shared';
import { CommentComponent, PostInputComponent } from '../../ui';
import { AvatarCircleComponent, SvgIconComponent } from '@tt/common-ui';
import { Store } from '@ngrx/store';
import { postsActions, PostService, selectProfileMe } from '@tt/data-access';
import { NgClass } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EditPostComponent } from '../edit-post/edit-post.component';
let PostComponent = class PostComponent {
    postService = inject(PostService);
    destroyRef = inject(DestroyRef);
    store = inject(Store);
    post = input.required();
    hasMe = input();
    profile = this.store.selectSignal(selectProfileMe);
    parentData = signal('');
    isActiveComments = false;
    likes = computed(() => {
        return this.post().likes;
    });
    comments = computed(() => {
        return this.post().comments;
    });
    showEdit = false;
    onDeletePost(postId) {
        this.store.dispatch(postsActions.deletePost({ postId }));
    }
    onCreateCommit(text) {
        const profile = this.profile();
        const result = normalizationText(text);
        const post = this.post();
        assertNonNullish(profile, '');
        assertNonNullish(result, '');
        assertNonNullish(post, '');
        if (this.parentData() === '' || result === '') {
            this.parentData.set('');
            return;
        }
        this.store.dispatch(postsActions.createComment({
            text: result,
            authorId: profile.id,
            postId: post.id,
            commentId: 0,
        }));
        this.parentData.set('');
        // firstValueFrom(
        //   this.postService.createComment({
        //     text: result,
        //     authorId: profile.id,
        //     postId: post.id,
        //     commentId: 0,
        //   })
        // )
        //   .then(() => {
        //     return firstValueFrom(
        //       this.postService.getCommentPostId(this.post()!.id)
        //     );
        //   })
        //   .then((comments) => {
        //     this.comments.set(comments);
        //     this.parentData.set('');
        //   });
    }
    toggleLikes(post) {
        this.postService
            .addLike(post.id)
            .pipe(catchError((error) => {
            if (error.error.detail === 'Like is already created') {
                return this.postService.deleteLike(post.id);
            }
            return throwError(() => {
                return error;
            });
        }), takeUntilDestroyed(this.destroyRef))
            .subscribe((response) => {
            this.store.dispatch(postsActions.updatePosts({
                post: {
                    ...this.post(),
                    likes: response.message === 'Like created'
                        ? this.post().likes + 1
                        : this.post().likes - 1,
                },
            }));
        });
    }
    toggleComment() {
        if (this.post().comments.length >= 0) {
            this.isActiveComments = !this.isActiveComments;
        }
    }
    onEditPost() {
        this.showEdit = !this.showEdit;
    }
    showEditEvent(showEdit) {
        this.showEdit = showEdit;
    }
};
PostComponent = __decorate([
    Component({
        selector: 'app-post',
        standalone: true,
        imports: [
            AvatarCircleComponent,
            SvgIconComponent,
            PostInputComponent,
            CommentComponent,
            DataCreateAtPipe,
            NgClass,
            EditPostComponent,
        ],
        templateUrl: './post.component.html',
        styleUrl: './post.component.scss',
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
], PostComponent);
export { PostComponent };
//# sourceMappingURL=post.component.js.map