import { createFeature, createReducer, on } from '@ngrx/store';
import { Post } from '@tt/interfaces/post';
import { postsActions } from './actions';

export interface PostState {
  posts: Post[];
}

const initialState: PostState = {
  posts: [],
};

export const postsFeature = createFeature({
  name: 'postsFeature',
  reducer: createReducer(
    initialState,
    on(postsActions.loadedPosts, (state, payload) => {
      return {
        ...state,
        posts: payload.posts,
      };
    }),
    on(postsActions.deletedPost, (state, payload) => {
      return {
        ...state,
        posts: state.posts.filter((element) => {
          return element.id !== payload.postId;
        }),
      };
    }),
    on(postsActions.createdPost, (state, payload) => {
      return {
        ...state,
        posts: [...state.posts, payload],
      };
    })
  ),
});
