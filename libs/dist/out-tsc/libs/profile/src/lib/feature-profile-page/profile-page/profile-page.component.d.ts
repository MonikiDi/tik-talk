import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '@tt/interfaces/profile';
export declare class ProfilePageComponent implements OnInit {
    private readonly activatedRoute;
    private destroyRef;
    private readonly router;
    private readonly store;
    profile$: Observable<Profile | undefined>;
    posts: import("@angular/core").Signal<import("@tt/interfaces/post").Post[] | undefined>;
    ngOnInit(): void;
    sendMessage(userId: number): Promise<void>;
}
//# sourceMappingURL=profile-page.component.d.ts.map