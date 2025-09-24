import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SvgIconComponent } from '@tt/common-ui';
import { FormsModule } from '@angular/forms';
import { DndDirective } from '@tt/shared';
let AvatarUploadComponent = class AvatarUploadComponent {
    preview = signal('/assets/imgs/avatar-placeholder.png');
    avatar = null;
    fileBrowserHandler(event) {
        const file = event.target?.files?.[0];
        this.processFile(file);
    }
    onFileDropped(file) {
        this.processFile(file);
    }
    processFile(file) {
        if (!file || !file.type.match('image'))
            return;
        const reader = new FileReader();
        reader.onload = (event) => {
            this.preview.set(event.target?.result?.toString() ?? '');
        };
        reader.readAsDataURL(file);
        this.avatar = file;
    }
};
AvatarUploadComponent = __decorate([
    Component({
        selector: 'app-avatar-upload',
        standalone: true,
        imports: [SvgIconComponent, DndDirective, FormsModule],
        templateUrl: './avatar-upload.component.html',
        styleUrl: './avatar-upload.component.scss',
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
], AvatarUploadComponent);
export { AvatarUploadComponent };
//# sourceMappingURL=avatar-upload.component.js.map