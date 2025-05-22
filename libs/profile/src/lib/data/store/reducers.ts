import { Profile, QueryParamsProfile } from '@tt/interfaces/profile';
import { createFeature, createReducer, on } from '@ngrx/store';
import { profileActions } from './actions';

export interface ProfileState {
  profiles: Profile[];
  profileFilters: Partial<QueryParamsProfile>;
  pagination: {
    currentPage: number;
    perPage: number;
    totalPages: number;
    total: number;
  };
}

export const initialState: ProfileState = {
  profiles: [],
  profileFilters: {},
  pagination: { currentPage: 1, perPage: 5, totalPages: 0, total: 0 },
};

export const profileFeature = createFeature({
  name: 'profileFeature',
  reducer: createReducer(
    initialState,
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
    })
  ),
});
