import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, effect, EventEmitter, HostBinding, inject, Input, input, Output, Renderer2, signal, viewChild, } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AvatarCircleComponent, SvgIconComponent } from '@tt/common-ui';
import { Store } from '@ngrx/store';
import { selectProfileMe } from '@tt/data-access';
let PostInputComponent = class PostInputComponent {
    store = inject(Store);
    r2 = inject(Renderer2);
    textAreaTarget = viewChild.required('textAreaTarget');
    profile = this.store.selectSignal(selectProfileMe);
    border = input('solid');
    placeholder = input('');
    postText = signal('');
    set data(value) {
        this.postText.set(value);
    }
    dataChange = new EventEmitter();
    onSubmit = new EventEmitter();
    get isComment() {
        return this.border() === 'dashed';
    }
    constructor() {
        effect(() => {
            const textValue = this.postText();
            if (textValue === '') {
                this.r2.setStyle(this.textAreaTarget().nativeElement, 'height', 'auto');
            }
            else {
                this.r2.setStyle(this.textAreaTarget().nativeElement, 'height', this.textAreaTarget().nativeElement.scrollHeight + 'px');
            }
        });
    }
    onDataChange(value) {
        this.dataChange.emit(value);
    }
};
__decorate([
    Input()
], PostInputComponent.prototype, "data", null);
__decorate([
    Output()
], PostInputComponent.prototype, "dataChange", void 0);
__decorate([
    Output()
], PostInputComponent.prototype, "onSubmit", void 0);
__decorate([
    HostBinding('class.comment')
], PostInputComponent.prototype, "isComment", null);
PostInputComponent = __decorate([
    Component({
        selector: 'app-post-input',
        standalone: true,
        imports: [AvatarCircleComponent, NgIf, SvgIconComponent, FormsModule],
        templateUrl: './post-input.component.html',
        styleUrl: './post-input.component.scss',
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
], PostInputComponent);
export { PostInputComponent };
//# sourceMappingURL=post-input.component.js.map