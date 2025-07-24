import { createFeature, createReducer, on } from '@ngrx/store';
import { Post } from '@tt/interfaces/post';
import { postsActions } from './actions';

export type PostsMap = Record<string, Post>;
export type UserIdPostsIdMap = Record<string, number[]>;

export interface PostsState {
  posts: PostsMap;
  userIdPostsId: UserIdPostsIdMap;
}

const initialState: PostsState = {
  posts: {},
  userIdPostsId: {}
};

export const postsFeature = createFeature({
  name: 'postsFeature',
  reducer: createReducer(
    initialState,
    // on(postsActions.loadedPosts, (state, payload) => {
    //   return {
    //     ...state,
    //     posts: payload.posts
    //   };
    // }),
    on(postsActions.deletedPost, (state, payload) => {
      const userId = state.posts[payload.postId].author.id;

      return {
        ...state,
        posts: {
          ...Object.fromEntries(
            Object.entries(state.posts).filter(
              ([key, value]) => key !== String(payload.postId)
            )
          )
        },
        userIdPostsId: {
          ...state.userIdPostsId,
          [userId]: state.userIdPostsId[userId].filter((element) => {
            return element !== payload.postId;
          })
        }
      };
    }),
    on(postsActions.createdPost, (state, payload) => {
      return {
        ...state,
        posts: {
          ...state.posts,
          [payload.id]: payload
        },
        userIdPostsId: {
          ...state.userIdPostsId,
          [payload.author.id]: [
            ...state.userIdPostsId[payload.author.id],
            payload.id
          ]
        }
      };
    }),
    on(postsActions.loadedPostsUserId, (state, payload) => {
      return {
        ...state,
        posts: {
          ...state.posts,
          ...payload.userPosts.reduce((acc, item) => {
            return { ...acc, [item.id]: item };
          }, {} as PostsMap)
        },
        userIdPostsId: {
          ...state.userIdPostsId,
          ...payload.userPosts.reduce((acc, item) => {
            if (item.author.id in acc) {
              acc[item.author.id].push(item.id);
              return {
                ...acc
              };
            } else {
              return { ...acc, [item.author.id]: [item.id] };
            }
          }, {} as UserIdPostsIdMap)
        }
      };
    }),
    on(postsActions.updatePosts, (state, payload) => {
      const postId = payload.post.id;
      return {
        ...state,
        posts: {
          ...state.posts,
          [postId]:
            state.posts[postId].id === postId
              ? payload.post
              : state.posts[postId].id
        }
      };
    }),
    on(postsActions.createdComment, (state, payload) => {
      const postId = payload.postId;
      return {
        ...state,
        posts: {
          ...state.posts,
          [postId]: {
            ...state.posts[postId],
            comments: [...state.posts[postId].comments, payload]
          }
        }
      };
    }),
    on(postsActions.deletedComment, (state, payload) => {
      const postId = payload.postId;
      const commentId = payload.commentId;

      return {
        ...state,
        posts: {
          ...state.posts,
          [postId]: {
            ...state.posts[postId],
            comments: [
              ...state.posts[postId].comments.filter((element) => {
                return element.id !== commentId;
              })
            ]
          }
        }
      };
    }),
    on(postsActions.editedPost, (state, payload) => {
      const postId = payload.id;
      return {
        ...state,
        posts: {
          ...state.posts,
          [postId]: {
            ...state.posts[postId],
            content: payload.content,
            title: payload.title,
          },
        },
      };
    })
  )
});
