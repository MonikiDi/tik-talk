import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
let LayoutComponent = class LayoutComponent {
};
LayoutComponent = __decorate([
    Component({
        selector: 'app-layout',
        standalone: true,
        imports: [SidebarComponent, RouterOutlet],
        templateUrl: './layout.component.html',
        styleUrl: './layout.component.scss',
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
], LayoutComponent);
export { LayoutComponent };
//# sourceMappingURL=layout.component.js.map