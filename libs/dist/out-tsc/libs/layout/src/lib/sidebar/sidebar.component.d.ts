import { OnInit } from '@angular/core';
export declare class SidebarComponent implements OnInit {
    private readonly subcriberService;
    private readonly store;
    readonly subscribers$: import("rxjs").Observable<import("@tt/interfaces/profile").Profile[]>;
    readonly me: import("@angular/core").Signal<import("@tt/interfaces/profile").Profile | undefined>;
    readonly unread: import("@angular/core").Signal<number>;
    readonly menuItems: {
        label: string;
        icon: string;
        link: string;
    }[];
    ngOnInit(): void;
}
//# sourceMappingURL=sidebar.component.d.ts.map