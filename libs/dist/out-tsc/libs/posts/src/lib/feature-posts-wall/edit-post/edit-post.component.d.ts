import { AfterViewInit, ElementRef, EventEmitter, OnInit } from '@angular/core';
import { Post, PostEdit } from '@tt/interfaces/post/post.interface';
export declare class EditPostComponent implements OnInit, AfterViewInit {
    private readonly r2;
    private readonly store;
    private readonly textAreaTarget;
    post: import("@angular/core").InputSignal<Post>;
    postEdit: PostEdit;
    showEdit: EventEmitter<boolean>;
    editPost: ElementRef | undefined;
    constructor();
    ngAfterViewInit(): void;
    ngOnInit(): void;
    submitEditPost(): void;
    cancelEditPost(): void;
}
//# sourceMappingURL=edit-post.component.d.ts.map