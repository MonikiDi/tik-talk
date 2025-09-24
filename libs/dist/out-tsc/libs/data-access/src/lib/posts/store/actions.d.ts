import { CommentCreateDto, Post, PostComment, PostCreateDto } from '@tt/interfaces/post';
import { PostEdit } from '@tt/interfaces/post/post.interface';
export declare const postsActions: {
    updatePosts: import("@ngrx/store").ActionCreator<"[posts] update posts", (props: {
        post: Post;
    }) => {
        post: Post;
    } & import("@ngrx/store").Action<"[posts] update posts">>;
    createPost: import("@ngrx/store").ActionCreator<"[posts] create post", (props: PostCreateDto) => PostCreateDto & import("@ngrx/store").Action<"[posts] create post">>;
    createdPost: import("@ngrx/store").ActionCreator<"[posts] created post", (props: Post) => Post & import("@ngrx/store").Action<"[posts] created post">>;
    deletePost: import("@ngrx/store").ActionCreator<"[posts] delete post", (props: {
        postId: number;
    }) => {
        postId: number;
    } & import("@ngrx/store").Action<"[posts] delete post">>;
    deletedPost: import("@ngrx/store").ActionCreator<"[posts] deleted post", (props: {
        postId: number;
    }) => {
        postId: number;
    } & import("@ngrx/store").Action<"[posts] deleted post">>;
    loadPostsUserId: import("@ngrx/store").ActionCreator<"[posts] load posts user id", (props: {
        userId: number;
    }) => {
        userId: number;
    } & import("@ngrx/store").Action<"[posts] load posts user id">>;
    loadedPostsUserId: import("@ngrx/store").ActionCreator<"[posts] loaded posts user id", (props: {
        userPosts: Post[];
    }) => {
        userPosts: Post[];
    } & import("@ngrx/store").Action<"[posts] loaded posts user id">>;
    createComment: import("@ngrx/store").ActionCreator<"[posts] create comment", (props: CommentCreateDto) => CommentCreateDto & import("@ngrx/store").Action<"[posts] create comment">>;
    createdComment: import("@ngrx/store").ActionCreator<"[posts] created comment", (props: PostComment) => PostComment & import("@ngrx/store").Action<"[posts] created comment">>;
    deleteComment: import("@ngrx/store").ActionCreator<"[posts] delete comment", (props: {
        postId: number;
        commentId: number;
    }) => {
        postId: number;
        commentId: number;
    } & import("@ngrx/store").Action<"[posts] delete comment">>;
    deletedComment: import("@ngrx/store").ActionCreator<"[posts] deleted comment", (props: {
        postId: number;
        commentId: number;
    }) => {
        postId: number;
        commentId: number;
    } & import("@ngrx/store").Action<"[posts] deleted comment">>;
    editPost: import("@ngrx/store").ActionCreator<"[posts] edit post", (props: {
        postId: number;
        postEdit: PostEdit;
    }) => {
        postId: number;
        postEdit: PostEdit;
    } & import("@ngrx/store").Action<"[posts] edit post">>;
    editedPost: import("@ngrx/store").ActionCreator<"[posts] edited post", (props: Post) => Post & import("@ngrx/store").Action<"[posts] edited post">>;
};
//# sourceMappingURL=actions.d.ts.map