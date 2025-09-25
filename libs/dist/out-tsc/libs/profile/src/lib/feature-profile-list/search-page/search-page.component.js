import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, computed, ElementRef, HostListener, inject, Renderer2, viewChild } from '@angular/core';
import { ProfileFiltersComponent } from '../profile-filters/profile-filters.component';
import { InfiniteScrollTriggerComponent, PaginationPageComponent } from '@tt/common-ui';
import { ProfileCardComponent } from '../../ui/profile-card/profile-card.component';
import { debounceTime } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { profileActions, selectFilteredProfiles, selectLoadingProfiles, selectPagination, selectProfiles } from '@tt/data-access';
import { Debounce } from '@tt/shared';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
let SearchPageComponent = class SearchPageComponent {
    store = inject(Store);
    hostElement = inject(ElementRef);
    r2 = inject(Renderer2);
    isPending = this.store.selectSignal(selectLoadingProfiles);
    formFilter = viewChild.required(ProfileFiltersComponent);
    pagination = this.store.selectSignal(selectPagination);
    currentPage = computed(() => {
        return this.pagination().currentPage;
    });
    items = toSignal(this.store.select(selectProfiles), {
        initialValue: []
    });
    totalPages = computed(() => {
        return this.pagination().totalPages;
    });
    isScroll = true;
    numberCards = [
        { value: 5, label: '5' },
        { value: 10, label: '10' },
        { value: 30, label: '30' }
    ];
    selectedNumberCards = 10;
    ngOnInit() {
        this.formFilterLoad();
    }
    onSelectionChange(event) {
        if (this.isScroll) {
            this.deleteStoreProfiles();
            this.loadProfiles();
            return;
        }
        const target = event.target;
        this.selectedNumberCards = +target.value;
        this.deleteStoreProfiles();
        this.loadProfiles();
    }
    switchShowProfile() {
        this.isScroll = !this.isScroll;
        this.selectedNumberCards = 10;
        this.formFilterLoad();
        this.deleteStoreProfiles();
        this.loadProfiles();
    }
    formFilterLoad() {
        this.formFilter()
            .searchForm.valueChanges.pipe(debounceTime(300))
            .subscribe((data) => {
            this.store.dispatch(profileActions.filterEvents(data));
        });
    }
    loadProfiles() {
        this.store.dispatch(profileActions.loadProfiles({
            filters: this.store.selectSignal(selectFilteredProfiles)(),
            pagination: { currentPage: 1, perPage: this.selectedNumberCards, isScroll: this.isScroll }
        }));
    }
    deleteStoreProfiles() {
        this.store.dispatch(profileActions.deleteStoreProfiles());
    }
    onGoTo(page) {
        this.onChangeCurrentPage(page);
    }
    onNext(page) {
        this.onChangeCurrentPage(page + 1);
    }
    onPrevious(page) {
        this.onChangeCurrentPage(page - 1);
    }
    onGoToPage() {
        if (this.currentPage() >= this.totalPages())
            return;
        this.onChangeCurrentPage(this.currentPage() + 1);
    }
    onChangeCurrentPage(page) {
        this.store.dispatch(profileActions.paginationProfiles({
            currentPage: page,
            perPage: this.selectedNumberCards,
            isScroll: this.isScroll
        }));
    }
    ngAfterViewInit() {
        this.resizeFeed();
    }
    onWindowResize() {
        this.resizeFeed();
    }
    resizeFeed() {
        const { top } = this.hostElement.nativeElement.getBoundingClientRect();
        const height = window.innerHeight - top - 48;
        this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
    }
};
__decorate([
    Debounce(20),
    HostListener('window: resize')
], SearchPageComponent.prototype, "onWindowResize", null);
SearchPageComponent = __decorate([
    Component({
        selector: 'app-search-page',
        standalone: true,
        imports: [
            ProfileFiltersComponent,
            PaginationPageComponent,
            ProfileCardComponent,
            InfiniteScrollTriggerComponent,
            FormsModule,
            NgForOf
        ],
        templateUrl: './search-page.component.html',
        styleUrl: './search-page.component.scss',
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], SearchPageComponent);
export { SearchPageComponent };
//# sourceMappingURL=search-page.component.js.map