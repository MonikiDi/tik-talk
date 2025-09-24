import { EventEmitter, Renderer2 } from '@angular/core';
export declare class MessageInputComponent {
    private readonly store;
    r2: Renderer2;
    private readonly textAreaTarget;
    me: import("@angular/core").Signal<import("@tt/interfaces/profile").Profile | undefined>;
    postText: import("@angular/core").WritableSignal<string>;
    set data(value: string);
    dataChange: EventEmitter<string>;
    onDataChange(value: string): void;
    onSubmit: EventEmitter<string>;
    constructor();
}
//# sourceMappingURL=message-input.component.d.ts.map