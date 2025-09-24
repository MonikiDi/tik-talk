import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
let SvgIconComponent = class SvgIconComponent {
    icon = '';
    get href() {
        return `assets/svg/${this.icon}.svg#${this.icon}`;
    }
};
__decorate([
    Input()
], SvgIconComponent.prototype, "icon", void 0);
SvgIconComponent = __decorate([
    Component({
        selector: 'svg[icon]',
        standalone: true,
        imports: [],
        template: '<svg:use [attr.href]="href"></svg:use>',
        styles: [''],
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
], SvgIconComponent);
export { SvgIconComponent };
//# sourceMappingURL=svg-icon.component.js.map