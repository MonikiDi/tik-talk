import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  Renderer2,
  Signal,
  viewChild
} from '@angular/core';
import { ProfileFiltersComponent } from '../profile-filters/profile-filters.component';
import { InfiniteScrollTriggerComponent, PaginationPageComponent } from '@tt/common-ui';
import { ProfileCardComponent } from '../../ui/profile-card/profile-card.component';
import { debounceTime } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import {
  profileActions,
  selectFilteredProfiles,
  selectLoadingProfiles,
  selectPagination,
  selectProfiles
} from '@tt/data-access';
import { Debounce } from '@tt/shared';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';

@Component({
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
export class SearchPageComponent implements OnInit, AfterViewInit {
  private readonly store = inject(Store);
  public hostElement = inject(ElementRef);
  public r2 = inject(Renderer2);
  public readonly isPending: Signal<boolean> = this.store.selectSignal(
    selectLoadingProfiles
  );
  public formFilter = viewChild.required(ProfileFiltersComponent);
  public pagination = this.store.selectSignal(selectPagination);
  public currentPage = computed(() => {
    return this.pagination().currentPage;
  });
  public readonly items = toSignal(this.store.select(selectProfiles), {
    initialValue: []
  });
  public totalPages = computed(() => {
    return this.pagination().totalPages;
  });

  public isScroll: boolean = true;

  public numberCards = [
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 30, label: '30' }
  ];

  public selectedNumberCards = 10;

  public ngOnInit() {
    this.formFilterLoad();
  }

  public onSelectionChange(event: Event) {
    if (this.isScroll) {
      this.deleteStoreProfiles();
      this.loadProfiles();
      return;
    }
    const target = event.target as HTMLSelectElement;
    this.selectedNumberCards = +target.value;
    this.deleteStoreProfiles();
    this.loadProfiles();
  }

  public switchShowProfile() {
    this.isScroll = !this.isScroll;
    this.selectedNumberCards = 10;
    this.formFilterLoad();
    this.deleteStoreProfiles();
    this.loadProfiles();
  }

  public formFilterLoad() {
    this.formFilter()
      .searchForm.valueChanges.pipe(debounceTime(300))
      .subscribe((data) => {
        this.store.dispatch(profileActions.filterEvents(data));
      });
  }

  public loadProfiles() {
    this.store.dispatch(
      profileActions.loadProfiles({
        filters: this.store.selectSignal(selectFilteredProfiles)(),
        pagination: { currentPage: 1, perPage: this.selectedNumberCards, isScroll: this.isScroll }
      })
    );
  }

  public deleteStoreProfiles() {
    this.store.dispatch(profileActions.deleteStoreProfiles());
  }

  public onGoTo(page: number): void {
    this.onChangeCurrentPage(page);
  }

  public onNext(page: number): void {
    this.onChangeCurrentPage(page + 1);
  }

  public onPrevious(page: number): void {
    this.onChangeCurrentPage(page - 1);
  }

  public onGoToPage(): void {
    if (this.currentPage() >= this.totalPages()) return;
    this.onChangeCurrentPage(this.currentPage() + 1);
  }

  public onChangeCurrentPage(page: number) {
    this.store.dispatch(
      profileActions.paginationProfiles({
        currentPage: page,
        perPage: this.selectedNumberCards,
        isScroll: this.isScroll
      })
    );
  }

  ngAfterViewInit() {
    this.resizeFeed();
  }

  @Debounce(20)
  @HostListener('window: resize')
  onWindowResize() {
    this.resizeFeed();
  }

  public resizeFeed() {
    const { top } = this.hostElement.nativeElement.getBoundingClientRect();
    const height = window.innerHeight - top - 48;
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }
}
