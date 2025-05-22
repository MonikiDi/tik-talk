import { createActionGroup, props } from '@ngrx/store';
import { Profile, QueryParamsProfile } from '@tt/interfaces/profile';
import { Pagination } from '@tt/shared';

export const profileActions = createActionGroup({
  source: 'profile',
  events: {
    'filter events': props<Partial<QueryParamsProfile>>(),
    'pagination profiles': props<{
      currentPage: number;
      perPage?: number;
    }>(),
    'pagination set': props<Pagination>(),
    'profiles loaded': props<{ profiles: Profile[] }>(),
  },
});
