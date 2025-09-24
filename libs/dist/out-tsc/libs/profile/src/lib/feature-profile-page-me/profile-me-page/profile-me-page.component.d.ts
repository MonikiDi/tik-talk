import { OnInit, Signal } from '@angular/core';
import { Post } from '@tt/interfaces/post';
import { Profile } from '@tt/interfaces/profile';
export declare class ProfileMePageComponent implements OnInit {
    private readonly store;
    private destroyRef;
    me: Signal<Profile | undefined>;
    me2: import("rxjs").Observable<Profile | undefined>;
    posts: import("@angular/core").WritableSignal<Post[]>;
    ngOnInit(): void;
}
//# sourceMappingURL=profile-me-page.component.d.ts.map