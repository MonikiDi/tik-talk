import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, effect, EventEmitter, inject, input, Output, Renderer2, ViewChild, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { postsActions } from '@tt/data-access';
import { Store } from '@ngrx/store';
let EditPostComponent = class EditPostComponent {
    r2 = inject(Renderer2);
    store = inject(Store);
    textAreaTarget = viewChild.required('textAreaTarget');
    post = input.required();
    postEdit = {
        title: '',
        content: '',
    };
    showEdit = new EventEmitter();
    editPost;
    constructor() {
        effect(() => {
            this.r2.setStyle(this.textAreaTarget().nativeElement, 'height', this.textAreaTarget().nativeElement.scrollHeight + 'px');
        });
    }
    ngAfterViewInit() {
        if (this.editPost) {
            this.editPost.nativeElement.focus();
        }
    }
    ngOnInit() {
        this.postEdit.content = this.post().content;
        this.postEdit.title = this.post().title;
    }
    submitEditPost() {
        this.store.dispatch(postsActions.editPost({ postId: this.post().id, postEdit: this.postEdit }));
        this.showEdit.emit(false);
    }
    cancelEditPost() {
        this.showEdit.emit(false);
    }
};
__decorate([
    Output()
], EditPostComponent.prototype, "showEdit", void 0);
__decorate([
    ViewChild('textAreaTarget')
], EditPostComponent.prototype, "editPost", void 0);
EditPostComponent = __decorate([
    Component({
        selector: 'app-edit-post',
        standalone: true,
        imports: [FormsModule],
        templateUrl: './edit-post.component.html',
        styleUrl: './edit-post.component.scss',
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
], EditPostComponent);
export { EditPostComponent };
//# sourceMappingURL=edit-post.component.js.map