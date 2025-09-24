import { Actions } from '@ngrx/effects';
export declare class PostEffects {
    actions$: Actions<any>;
    private readonly postService;
    addPost$: import("rxjs").Observable<import("@tt/interfaces/post").Post & import("@ngrx/store").Action<"[posts] created post">> & import("@ngrx/effects").CreateEffectMetadata;
    deletePostId$: import("rxjs").Observable<{
        postId: number;
    } & import("@ngrx/store").Action<"[posts] deleted post">> & import("@ngrx/effects").CreateEffectMetadata;
    getPostsUserId$: import("rxjs").Observable<{
        userPosts: import("@tt/interfaces/post").Post[];
    } & import("@ngrx/store").Action<"[posts] loaded posts user id">> & import("@ngrx/effects").CreateEffectMetadata;
    addCommentPost$: import("rxjs").Observable<import("@tt/interfaces/post").PostComment & import("@ngrx/store").Action<"[posts] created comment">> & import("@ngrx/effects").CreateEffectMetadata;
    deleteCommentId$: import("rxjs").Observable<{
        postId: number;
        commentId: number;
    } & import("@ngrx/store").Action<"[posts] deleted comment">> & import("@ngrx/effects").CreateEffectMetadata;
    editPost$: import("rxjs").Observable<import("@tt/interfaces/post").Post & import("@ngrx/store").Action<"[posts] edited post">> & import("@ngrx/effects").CreateEffectMetadata;
}
//# sourceMappingURL=effects.d.ts.map