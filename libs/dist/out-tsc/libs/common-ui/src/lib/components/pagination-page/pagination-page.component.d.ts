import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
export declare class PaginationPageComponent implements OnChanges {
    current: number;
    total: number;
    disabled: boolean;
    goTo: EventEmitter<number>;
    next: EventEmitter<number>;
    previous: EventEmitter<number>;
    pages: number[];
    ngOnChanges(changes: SimpleChanges): void;
    onGoTo(page: number): void;
    onNext(): void;
    onPrevious(): void;
    private getPages;
}
//# sourceMappingURL=pagination-page.component.d.ts.map