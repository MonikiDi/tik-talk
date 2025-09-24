import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Profile, QueryParamsProfile } from '@tt/interfaces/profile';
import { Pageble, Pagination } from '@tt/shared';

export const profileActions = createActionGroup({
  source: 'profile',
  events: {
    'Load get me': emptyProps(),
    'Loaded get me': props<{ profileMe: Profile }>(),
    'Load patch me': props<Partial<Profile>>(),
    'Load patch avatar me': props<{ file: File }>(),
    'Loaded patch avatar me': props<Profile>(),
    'Loaded patch me': props<Profile>(),
    'Load user id': props<{ userId: string }>(),
    'Loaded user': props<{ user: Profile }>(),
    'filter events': props<Partial<QueryParamsProfile>>(),
    'pagination profiles': props<{
      currentPage: number;
      perPage?: number;
      isScroll?: boolean
    }>(),

    'pagination set': props<Pagination>(),
    'profiles loaded': props<{ profiles: Profile[] }>(),
    'Loading start profiles': emptyProps(),
    'Loading end profiles': emptyProps(),
    'Load Profiles': props<{
      filters: Partial<QueryParamsProfile>;
      pagination: {
        currentPage: number;
        perPage?: number;
        isScroll?: boolean
      };
    }>(),
    'Loaded Infinite Profiles': props<Pageble<Profile>>(),
    'Loaded Pagination Profiles': props<Pageble<Profile>>(),
    'Delete Store Profiles': emptyProps(),
  }
});
