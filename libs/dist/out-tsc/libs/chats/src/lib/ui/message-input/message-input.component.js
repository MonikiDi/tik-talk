import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, effect, EventEmitter, inject, Input, Output, Renderer2, signal, viewChild, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AvatarCircleComponent } from '@tt/common-ui';
import { SvgIconComponent } from '@tt/common-ui';
import { Store } from '@ngrx/store';
import { selectProfileMe } from '@tt/data-access';
let MessageInputComponent = class MessageInputComponent {
    store = inject(Store);
    r2 = inject(Renderer2);
    textAreaTarget = viewChild.required('textAreaTarget');
    me = this.store.selectSignal(selectProfileMe);
    postText = signal('');
    set data(value) {
        this.postText.set(value);
    }
    dataChange = new EventEmitter();
    onDataChange(value) {
        this.dataChange.emit(value);
    }
    onSubmit = new EventEmitter();
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
};
__decorate([
    Input()
], MessageInputComponent.prototype, "data", null);
__decorate([
    Output()
], MessageInputComponent.prototype, "dataChange", void 0);
__decorate([
    Output()
], MessageInputComponent.prototype, "onSubmit", void 0);
MessageInputComponent = __decorate([
    Component({
        selector: 'app-message-input',
        standalone: true,
        imports: [AvatarCircleComponent, FormsModule, NgIf, SvgIconComponent],
        templateUrl: './message-input.component.html',
        styleUrl: './message-input.component.scss',
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
], MessageInputComponent);
export { MessageInputComponent };
//# sourceMappingURL=message-input.component.js.map