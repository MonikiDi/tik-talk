import { Profile, QueryParamsProfile } from '@tt/interfaces/profile';
import { createFeature, createReducer, on } from '@ngrx/store';
import { profileActions } from './actions';

export interface ProfileState {
  profileMe: Profile | undefined;
  userId: string;
  user: Profile | undefined;
  profiles: Profile[];
  profileFilters: Partial<QueryParamsProfile>;
  pagination: {
    currentPage: number;
    perPage: number;
    totalPages: number;
    total: number;
  };
  isLoading: boolean;
}

export const initialState: ProfileState = {
  profileMe: undefined,
  userId: '',
  user: undefined,
  profiles: [],
  profileFilters: {},
  pagination: { currentPage: 1, perPage: 5, totalPages: 0, total: 0 },
  isLoading: false,
};

export const profileFeature = createFeature({
  name: 'profileFeature',
  reducer: createReducer(
    initialState,
    on(profileActions.loadedGetMe, (state, payload) => {
      return {
        ...state,
        profileMe: payload.profileMe,
      };
    }),
    on(profileActions.loadUserId, (state, payload) => {
      return {
        ...state,
        userId: payload.userId,
      };
    }),
    on(profileActions.loadedUser, (state, payload) => {
      return {
        ...state,
        user: payload.user,
      };
    }),
    on(profileActions.profilesLoaded, (state, payload) => {
      return {
        ...state,
        profiles: payload.profiles,
      };
    }),
    on(profileActions.filterEvents, (state, payload) => {
      return {
        ...state,
        profileFilters: {
          ...state.profileFilters,
          ...payload,
        },
      };
    }),
    on(profileActions.paginationProfiles, (state, payload) => {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          ...payload,
        },
      };
    }),
    on(profileActions.paginationSet, (state, payload) => {
      return {
        ...state,
        pagination: { ...payload },
      };
    }),
    on(profileActions.loadingStartProfiles, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    }),
    on(profileActions.loadingEndProfiles, (state) => {
      return {
        ...state,
        isLoading: false,
      };
    }),
    on(profileActions.loadedProfiles, (state, payload) => {
      return {
        ...state,
        pagination: {
          total: payload.total,
          currentPage: payload.page,
          perPage: payload.size,
          totalPages: payload.pages,
        },
        profiles: payload.items,
      };
    })
  ),
});
