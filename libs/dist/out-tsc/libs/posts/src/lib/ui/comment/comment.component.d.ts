import { PostComment } from '@tt/interfaces/post';
export declare class CommentComponent {
    private readonly store;
    comment: import("@angular/core").InputSignal<PostComment | undefined>;
    hasMe: import("@angular/core").InputSignal<boolean | undefined>;
    meId: import("@angular/core").Signal<import("@tt/interfaces/profile").Profile | undefined>;
    onDeleteComment(postId: number, commentId: number): void;
}
//# sourceMappingURL=comment.component.d.ts.map