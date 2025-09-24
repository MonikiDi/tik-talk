import { EventEmitter } from '@angular/core';
export declare class PostInputComponent {
    private readonly store;
    private readonly r2;
    private readonly textAreaTarget;
    profile: import("@angular/core").Signal<import("@tt/interfaces/profile").Profile | undefined>;
    border: import("@angular/core").InputSignal<"solid" | "dashed">;
    placeholder: import("@angular/core").InputSignal<string>;
    postText: import("@angular/core").WritableSignal<string>;
    set data(value: string);
    dataChange: EventEmitter<string>;
    onSubmit: EventEmitter<string>;
    get isComment(): boolean;
    constructor();
    onDataChange(value: string): void;
}
//# sourceMappingURL=post-input.component.d.ts.map