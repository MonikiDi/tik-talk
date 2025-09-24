import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
let AboutMeComponent = class AboutMeComponent {
    profile = input.required();
};
AboutMeComponent = __decorate([
    Component({
        selector: 'app-about-me',
        standalone: true,
        imports: [],
        templateUrl: './about-me.component.html',
        styleUrl: './about-me.component.scss',
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
], AboutMeComponent);
export { AboutMeComponent };
//# sourceMappingURL=about-me.component.js.map