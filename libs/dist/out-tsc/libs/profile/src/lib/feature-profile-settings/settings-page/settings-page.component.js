import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, effect, inject, ViewChild, } from '@angular/core';
import { ProfileHeaderComponent } from '../../ui/profile-header/profile-header.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { AvatarUploadComponent } from '../../ui/avatar-upload/avatar-upload.component';
import { TasksComponent } from '@tt/common-ui';
import { AboutMeComponent } from '@tt/common-ui';
import { Store } from '@ngrx/store';
import { profileActions, selectProfileMe } from '@tt/data-access';
let SettingsPageComponent = class SettingsPageComponent {
    fb = inject(FormBuilder);
    store = inject(Store);
    profile$ = this.store.select(selectProfileMe);
    avatarUploader;
    form = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        username: [{ value: '', disabled: true }, Validators.required],
        description: [''],
        city: [''],
        stack: [''],
    });
    constructor() {
        effect(() => {
            this.form.patchValue({
                ...this.store.selectSignal(selectProfileMe)(),
                stack: this.mergeStack(this.store.selectSignal(selectProfileMe)()?.stack),
            });
        });
    }
    onSave() {
        this.form.markAllAsTouched();
        this.form.updateValueAndValidity();
        if (this.form.invalid)
            return;
        if (this.avatarUploader.avatar) {
            this.store.dispatch(profileActions.loadPatchAvatarMe({ file: this.avatarUploader.avatar }));
        }
        this.store.dispatch(profileActions.loadPatchMe({
            firstName: this.form.value.firstName || undefined,
            lastName: this.form.value.lastName || undefined,
            username: this.form.value.username || undefined,
            description: this.form.value.description || undefined,
            city: this.form.value.city || undefined,
            stack: this.splitStack(this.form.value.stack),
        }));
    }
    splitStack(stack) {
        if (!stack)
            return [];
        if (Array.isArray(stack))
            return stack;
        return stack.split(',');
    }
    mergeStack(stack) {
        if (!stack)
            return '';
        if (Array.isArray(stack))
            return stack.join(',');
        return stack;
    }
};
__decorate([
    ViewChild(AvatarUploadComponent)
], SettingsPageComponent.prototype, "avatarUploader", void 0);
SettingsPageComponent = __decorate([
    Component({
        selector: 'app-settings-page',
        standalone: true,
        imports: [
            ProfileHeaderComponent,
            ReactiveFormsModule,
            RouterLink,
            AsyncPipe,
            AvatarUploadComponent,
            TasksComponent,
            AboutMeComponent,
        ],
        templateUrl: './settings-page.component.html',
        styleUrl: './settings-page.component.scss',
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
], SettingsPageComponent);
export { SettingsPageComponent };
//# sourceMappingURL=settings-page.component.js.map