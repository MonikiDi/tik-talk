import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  profileActions,
  selectFilteredProfiles,
  selectPaginationProfiles,
} from './';
import { map, switchMap, tap } from 'rxjs';
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

  filterProfiles = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileActions.filterEvents),
      concatLatestFrom(() => this.store.select(selectPaginationProfiles)),
      switchMap(([filters, pagination]) => {
        return this.profileService.query(filters, {
          page: 1,
          perPage: pagination.perPage || 5,
        });
      }),
      tap((res) => {
        profileActions.paginationSet({
          total: res.total,
          currentPage: res.page,
          perPage: res.size,
          totalPages: res.pages,
        });
      }),
      map((res) => profileActions.profilesLoaded({ profiles: res.items }))
    );
  });

  paginationProfiles = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileActions.paginationProfiles),
      concatLatestFrom(() => this.store.select(selectFilteredProfiles)),
      switchMap(([pagination, filters]) => {
        return this.profileService.query(filters, {
          page: pagination.currentPage,
          perPage: pagination.perPage || 5,
        });
      }),
      tap((res) => {
        profileActions.paginationSet({
          total: res.total,
          currentPage: res.page,
          perPage: res.size,
          totalPages: res.pages,
        });
      }),
      map((res) => profileActions.profilesLoaded({ profiles: res.items }))
    );
  });
}
