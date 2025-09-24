import { createActionGroup, emptyProps, props } from '@ngrx/store';
export const profileActions = createActionGroup({
    source: 'profile',
    events: {
        'Load get me': emptyProps(),
        'Loaded get me': props(),
        'Load patch me': props(),
        'Load patch avatar me': props(),
        'Loaded patch avatar me': props(),
        'Loaded patch me': props(),
        'Load user id': props(),
        'Loaded user': props(),
        'filter events': props(),
        'pagination profiles': props(),
        'pagination set': props(),
        'profiles loaded': props(),
        'Loading start profiles': emptyProps(),
        'Loading end profiles': emptyProps(),
        'Load Profiles': props(),
        'Loaded Infinite Profiles': props(),
        'Loaded Pagination Profiles': props(),
        'Delete Store Profiles': emptyProps(),
    }
});
//# sourceMappingURL=actions.js.map