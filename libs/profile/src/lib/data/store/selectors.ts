import { createSelector } from '@ngrx/store';
import { profileFeature, ProfileState } from './reducers';

export const selectProfiles = createSelector(
  profileFeature.selectProfiles,
  (profiles) => profiles
);

export const selectFilteredProfiles = createSelector(
  profileFeature.selectProfileFilters,
  (filter) => filter
);

export const selectPaginationProfiles = createSelector(
  profileFeature.selectPagination,
  (pagination) => pagination
);

export const selectLoadingProfiles = createSelector(
  profileFeature.selectIsLoading,
  (state) => {
    return state;
  }
);
