import { createSelector } from '@ngrx/store';
import { profileFeature } from './reducers';

export const selectProfileMe = createSelector(
  profileFeature['selectProfileMe'],
  (profileMe) => {
    return profileMe ? profileMe : undefined;
  }
);
export const selectUser = createSelector(
  profileFeature['selectUser'],
  (user) => user
);

export const selectProfiles = createSelector(
  profileFeature['selectProfiles'],
  (profiles) => profiles
);

export const selectFilteredProfiles = createSelector(
  profileFeature['selectProfileFilters'],
  (filter) => filter
);

export const selectPaginationProfiles = createSelector(
  profileFeature['selectPagination'],
  (pagination) => pagination
);

export const selectLoadingProfiles = createSelector(
  profileFeature['selectIsLoading'],
  (state) => {
    return state;
  }
);
export const selectPagination = createSelector(
  profileFeature['selectPagination'],
  (state) => state
);
