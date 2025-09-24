import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, output } from '@angular/core';
let InfiniteScrollTriggerComponent = class InfiniteScrollTriggerComponent {
    loaded = output();
    ngOnInit() {
        this.loaded.emit();
    }
};
InfiniteScrollTriggerComponent = __decorate([
    Component({
        selector: 'app-infinite-scroll-trigger',
        standalone: true,
        imports: [],
        templateUrl: './infinite-scroll-trigger.component.html',
        styleUrl: './infinite-scroll-trigger.component.scss',
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], InfiniteScrollTriggerComponent);
export { InfiniteScrollTriggerComponent };
//# sourceMappingURL=infinite-scroll-trigger.component.js.map