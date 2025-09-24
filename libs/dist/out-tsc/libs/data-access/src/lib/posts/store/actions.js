import { createActionGroup, props } from '@ngrx/store';
export const postsActions = createActionGroup({
    source: 'posts',
    events: {
        // 'load posts': emptyProps(),
        // 'loaded posts': props<{ posts: Post[] }>(),
        'update posts': props(),
        'create post': props(),
        'created post': props(),
        'delete post': props(),
        'deleted post': props(),
        'load posts user id': props(),
        'loaded posts user id': props(),
        'create comment': props(),
        'created comment': props(),
        'delete comment': props(),
        'deleted comment': props(),
        'edit post': props(),
        'edited post': props(),
    },
});
//# sourceMappingURL=actions.js.map