import { AfterViewInit, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
export declare class ChatsListComponent implements OnInit, AfterViewInit {
    hostElement: ElementRef<any>;
    r2: Renderer2;
    store: Store<any>;
    filterChatsControl: FormControl<string | null>;
    chats: import("@angular/core").Signal<import("@tt/interfaces/chats").LastMessageRes[]>;
    private readonly filterChatsControlValue;
    filterChats: import("@angular/core").Signal<import("@tt/interfaces/chats").LastMessageRes[]>;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    onWindowResize(): void;
    resizeFeed(): void;
}
//# sourceMappingURL=chats-list.component.d.ts.map