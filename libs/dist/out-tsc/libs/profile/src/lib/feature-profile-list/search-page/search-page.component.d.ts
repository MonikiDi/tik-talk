import { AfterViewInit, ElementRef, OnInit, Renderer2, Signal } from '@angular/core';
import { ProfileFiltersComponent } from '../profile-filters/profile-filters.component';
export declare class SearchPageComponent implements OnInit, AfterViewInit {
    private readonly store;
    hostElement: ElementRef<any>;
    r2: Renderer2;
    readonly isPending: Signal<boolean>;
    formFilter: Signal<ProfileFiltersComponent>;
    pagination: Signal<{
        currentPage: number;
        perPage: number;
        totalPages: number;
        total: number;
    }>;
    currentPage: Signal<number>;
    readonly items: Signal<import("@tt/interfaces/profile").Profile[] | undefined>;
    totalPages: Signal<number>;
    isScroll: boolean;
    numberCards: {
        value: number;
        label: string;
    }[];
    selectedNumberCards: number;
    ngOnInit(): void;
    onSelectionChange(event: Event): void;
    switchShowProfile(): void;
    formFilterLoad(): void;
    loadProfiles(): void;
    deleteStoreProfiles(): void;
    onGoTo(page: number): void;
    onNext(page: number): void;
    onPrevious(page: number): void;
    onGoToPage(): void;
    onChangeCurrentPage(page: number): void;
    ngAfterViewInit(): void;
    onWindowResize(): void;
    resizeFeed(): void;
}
//# sourceMappingURL=search-page.component.d.ts.map