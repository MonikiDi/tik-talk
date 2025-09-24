import { Post } from '@tt/interfaces/post';
export type PostsMap = Record<string, Post>;
export type UserIdPostsIdMap = Record<string, number[]>;
export interface PostsState {
    posts: PostsMap;
    userIdPostsId: UserIdPostsIdMap;
}
export declare const postsFeature: {
    name: "postsFeature";
    reducer: import("@ngrx/store").ActionReducer<PostsState, import("@ngrx/store").Action<string>>;
    selectPostsFeatureState: import("@ngrx/store").MemoizedSelector<Record<string, any>, PostsState, (featureState: PostsState) => PostsState>;
    selectPosts: import("@ngrx/store").MemoizedSelector<Record<string, any>, PostsMap, (featureState: PostsState) => PostsMap>;
    selectUserIdPostsId: import("@ngrx/store").MemoizedSelector<Record<string, any>, UserIdPostsIdMap, (featureState: PostsState) => UserIdPostsIdMap>;
};
//# sourceMappingURL=reducers.d.ts.map