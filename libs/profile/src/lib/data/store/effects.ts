import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  profileActions,
  selectFilteredProfiles,
  selectPaginationProfiles,
} from './';
import {
  catchError,
  EMPTY,
  exhaustMap,
  finalize,
  map,
  switchMap,
  tap,
} from 'rxjs';
import { ProfileService } from '../services/profile.service';
import { Store } from '@ngrx/store';
import { concatLatestFrom } from '@ngrx/operators';

@Injectable({
  providedIn: 'root',
})
export class ProfileEffects {
  profileService = inject(ProfileService);
  actions$ = inject(Actions);

  private readonly store = inject(Store);

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
            page: 1,
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
        return profileActions.loadProfiles({ filters, pagination });
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
