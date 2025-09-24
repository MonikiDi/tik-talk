import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, inject, input, } from '@angular/core';
import { AvatarCircleComponent, SvgIconComponent } from '@tt/common-ui';
import { DataCreateAtPipe } from '@tt/shared';
import { postsActions, selectProfileMe } from '@tt/data-access';
import { Store } from '@ngrx/store';
import { EditPostComponent } from '@tt/posts';
let CommentComponent = class CommentComponent {
    store = inject(Store);
    comment = input();
    hasMe = input();
    meId = this.store.selectSignal(selectProfileMe);
    onDeleteComment(postId, commentId) {
        this.store.dispatch(postsActions.deleteComment({ postId, commentId }));
    }
};
CommentComponent = __decorate([
    Component({
        selector: 'app-comment',
        standalone: true,
        imports: [AvatarCircleComponent, DataCreateAtPipe, SvgIconComponent, EditPostComponent],
        templateUrl: './comment.component.html',
        styleUrl: './comment.component.scss',
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
], CommentComponent);
export { CommentComponent };
//# sourceMappingURL=comment.component.js.map