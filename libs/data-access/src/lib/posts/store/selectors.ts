import { createSelector } from '@ngrx/store';
import { Post } from '@tt/interfaces/post';
import { postsFeature } from './reducers';

// export const selectPosts = createSelector(postsFeature.selectPosts, (state) => {
//   return state;
// });
// export const selectPostsUserId = createSelector(
//   postsFeature.selectPostsUserId,
//   (state) => {
//     return state;
//   }
// );
// export const selectPostsUserId = (userId: string) => {
//   return createSelector(postsFeature.selectUserIdPostsId, (posts) => {
//     return posts[userId];
//   });
// };

export const selectUserById = (userId: number) =>
  createSelector(postsFeature.selectUserIdPostsId, (state) => {
    return state[userId] || [];
  });

export const selectPostsUserById = (userId: number) => {
  return createSelector(
    postsFeature.selectPosts,
    selectUserById(userId),
    (state, postsId) => {
      const posts: Post[] = [];
      for (const id in state) {
        if (postsId.includes(Number(id))) {
          posts.push(<Post>state[id]);
        }
      }
      return posts;
    }
  );
};
