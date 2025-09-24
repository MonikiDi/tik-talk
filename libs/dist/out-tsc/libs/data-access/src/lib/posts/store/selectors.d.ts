import { Post } from '@tt/interfaces/post';
export declare const selectUserById: (userId: number) => import("@ngrx/store").MemoizedSelector<Record<string, any>, number[], (s1: import("./reducers").UserIdPostsIdMap) => number[]>;
export declare const selectPostsUserById: (userId: number) => import("@ngrx/store").MemoizedSelector<Record<string, any>, Post[], (s1: import("./reducers").PostsMap, s2: number[]) => Post[]>;
//# sourceMappingURL=selectors.d.ts.map