import { CommentCreateDto, Post, PostComment, PostCreateDto, PostEdit } from '@tt/interfaces/post/post.interface';
export declare class PostService {
    private readonly http;
    private readonly baseApiUrl;
    createPost(payload: PostCreateDto): import("rxjs").Observable<Post>;
    updatePost(postId: number, payload: PostEdit): import("rxjs").Observable<Post>;
    fetchPosts(): import("rxjs").Observable<Post[]>;
    deletePost(postId: number): import("rxjs").Observable<void>;
    createComment(payload: CommentCreateDto): import("rxjs").Observable<PostComment>;
    deleteComment(postId: number): import("rxjs").Observable<void>;
    addLike(postId: number): import("rxjs").Observable<{
        message: string;
    }>;
    deleteLike(postId: number): import("rxjs").Observable<{
        message: string;
    }>;
    getPostsUserId(queryParam: number): import("rxjs").Observable<Post[]>;
    getCommentPostId(postId: number): import("rxjs").Observable<PostComment[]>;
    editPost(editPost: PostEdit): import("rxjs").Observable<PostEdit>;
}
//# sourceMappingURL=post.service.d.ts.map