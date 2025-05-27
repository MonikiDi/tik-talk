import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  profileActions,
  selectFilteredProfiles,
  selectPaginationProfiles,
} from './';
import { catchError, EMPTY, exhaustMap, map, switchMap } from 'rxjs';
import { ProfileService } from '../services/profile.service';
import { Store } from '@ngrx/store';
import { concatLatestFrom } from '@ngrx/operators';

export class ProfileEffects {
  profileService = inject(ProfileService);
  actions$ = inject(Actions);

  private readonly store = inject(Store);

  loadProfileMe = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileActions.loadGetMe),
      switchMap(() => {
        return this.profileService
          .getMe()
          .pipe(map((data) => profileActions.loadedGetMe({ profileMe: data })));
      })
    );
  });

  loadUserId = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileActions.loadUserId),
      switchMap(({ userId }) => {
        return this.profileService
          .getAccount(userId)
          .pipe(map((data) => profileActions.loadedUser({ user: data })));
      })
    );
  });

  loadingStartProfiles = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileActions.loadProfiles),
      map(() => profileActions.loadingStartProfiles())
    );
  });

  loadingEndProfiles = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileActions.loadedProfiles),
      map(() => profileActions.loadingEndProfiles())
    );
  });

  loadProfile = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileActions.loadProfiles),
      exhaustMap(({ filters, pagination }) => {
        return this.profileService
          .query(filters, {
            page: pagination.currentPage,
            perPage: pagination.perPage || 5,
          })
          .pipe(
            map((response) => profileActions.loadedProfiles(response)),
            catchError(() => EMPTY)
          );
      })
    );
  });

  filterProfiles = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileActions.filterEvents),
      concatLatestFrom(() => this.store.select(selectPaginationProfiles)),
      map(([filters, pagination]) => {
        return profileActions.loadProfiles({
          filters,
          pagination: {
            ...pagination,
            currentPage: 1,
          },
        });
      })
    );
  });

  paginationProfiles = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileActions.paginationProfiles),
      concatLatestFrom(() => this.store.select(selectFilteredProfiles)),
      map(([pagination, filters]) => {
        return profileActions.loadProfiles({ filters, pagination });
      })
    );
  });
}
