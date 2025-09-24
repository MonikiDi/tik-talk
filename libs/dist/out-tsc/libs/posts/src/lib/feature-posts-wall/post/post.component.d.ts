import { Post } from '@tt/interfaces/post';
export declare class PostComponent {
    private readonly postService;
    private readonly destroyRef;
    private readonly store;
    post: import("@angular/core").InputSignal<Post>;
    hasMe: import("@angular/core").InputSignal<boolean | undefined>;
    profile: import("@angular/core").Signal<import("@tt/interfaces/profile").Profile | undefined>;
    parentData: import("@angular/core").WritableSignal<string>;
    isActiveComments: boolean;
    likes: import("@angular/core").Signal<number>;
    comments: import("@angular/core").Signal<import("@tt/interfaces/post").PostComment[]>;
    showEdit: boolean;
    onDeletePost(postId: number): void;
    onCreateCommit(text: string): void;
    toggleLikes(post: Post): void;
    toggleComment(): void;
    onEditPost(): void;
    showEditEvent(showEdit: boolean): void;
}
//# sourceMappingURL=post.component.d.ts.map