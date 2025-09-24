import { createSelector } from '@ngrx/store';
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
export const selectUserById = (userId) => createSelector(postsFeature.selectUserIdPostsId, (state) => {
    return state[userId] || [];
});
export const selectPostsUserById = (userId) => {
    return createSelector(postsFeature.selectPosts, selectUserById(userId), (state, postsId) => {
        const posts = [];
        for (const id in state) {
            if (postsId.includes(Number(id))) {
                posts.push(state[id]);
            }
        }
        return posts;
    });
};
//# sourceMappingURL=selectors.js.map