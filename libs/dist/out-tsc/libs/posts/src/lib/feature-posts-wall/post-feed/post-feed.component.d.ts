import { AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { Post } from '@tt/interfaces/post';
export declare class PostFeedComponent implements AfterViewInit {
    private readonly activatedRoute;
    private readonly store;
    hostElement: ElementRef<any>;
    r2: Renderer2;
    posts: import("@angular/core").InputSignal<Post[]>;
    profile: import("@angular/core").Signal<import("@tt/interfaces/profile").Profile | undefined>;
    hasMe: boolean;
    userId: string;
    sortPosts: import("@angular/core").Signal<Post[]>;
    parentData: import("@angular/core").WritableSignal<string>;
    ngAfterViewInit(): void;
    onWindowResize(): void;
    resizeFeed(): void;
    onCreatePost(text: string): void;
}
//# sourceMappingURL=post-feed.component.d.ts.map