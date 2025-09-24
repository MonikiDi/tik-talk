import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
let PaginationPageComponent = class PaginationPageComponent {
    current = 0;
    total = 0;
    disabled = true;
    // public readonly disabled = input<boolean>(true);
    goTo = new EventEmitter();
    next = new EventEmitter();
    previous = new EventEmitter();
    pages = [];
    ngOnChanges(changes) {
        // if (
        //   (changes.current && changes.current.currentValue) ||
        //   (changes.total && changes.total.currentValue)
        // ) {
        this.pages = this.getPages(this.current, this.total);
    }
    // }
    onGoTo(page) {
        this.goTo.emit(page);
    }
    onNext() {
        this.next.emit(this.current);
    }
    onPrevious() {
        this.previous.next(this.current);
    }
    getPages(current, total) {
        if (total <= 7) {
            return [...Array(total).keys()].map((x) => ++x);
        }
        if (current >= 5) {
            if (current >= total - 3) {
                return [
                    1,
                    -1,
                    total - 6,
                    total - 5,
                    total - 4,
                    total - 3,
                    total - 2,
                    total - 1,
                    total,
                ];
            }
            else {
                return [
                    1,
                    -1,
                    current - 2,
                    current - 1,
                    current,
                    current + 1,
                    current + 2,
                    -1,
                    total,
                ];
            }
        }
        return [1, 2, 3, 4, 5, 6, 7, -1, total];
    }
};
__decorate([
    Input()
], PaginationPageComponent.prototype, "current", void 0);
__decorate([
    Input()
], PaginationPageComponent.prototype, "total", void 0);
__decorate([
    Input()
], PaginationPageComponent.prototype, "disabled", void 0);
__decorate([
    Output()
], PaginationPageComponent.prototype, "goTo", void 0);
__decorate([
    Output()
], PaginationPageComponent.prototype, "next", void 0);
__decorate([
    Output()
], PaginationPageComponent.prototype, "previous", void 0);
PaginationPageComponent = __decorate([
    Component({
        selector: 'app-pagination-page',
        standalone: true,
        imports: [NgForOf, NgIf, SvgIconComponent],
        templateUrl: './pagination-page.component.html',
        styleUrl: './pagination-page.component.scss',
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
], PaginationPageComponent);
export { PaginationPageComponent };
//# sourceMappingURL=pagination-page.component.js.map