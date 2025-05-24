import {
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  InputSignal,
  OnInit,
  Signal,
  signal,
  viewChild,
} from '@angular/core';
import { ProfileFiltersComponent } from '../profile-filters/profile-filters.component';
import { PaginationPageComponent } from '@tt/common-ui';
import { ProfileCardComponent } from '../../ui/profile-card/profile-card.component';
import {
  combineLatest,
  debounceTime,
  finalize,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import {
  takeUntilDestroyed,
  toObservable,
  toSignal,
} from '@angular/core/rxjs-interop';
import { ProfileService } from '../../data/services/profile.service';
import { Store } from '@ngrx/store';
import {
  selectLoadingProfiles,
  selectPagination,
  selectProfiles,
} from '../../data/store/selectors';
import { profileActions } from '../../data/store/actions';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [
    ProfileFiltersComponent,
    PaginationPageComponent,
    ProfileCardComponent,
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent implements OnInit {
  public readonly destroyRef = inject(DestroyRef);
  public readonly profileService = inject(ProfileService);
  private readonly store = inject(Store);
  public readonly isPending: Signal<boolean> = this.store.selectSignal(
    selectLoadingProfiles
  );
  public formFilter = viewChild.required(ProfileFiltersComponent);
  public pagination = this.store.selectSignal(selectPagination);
  public currentPage = computed(() => {
    return this.pagination().currentPage;
  });
  public perPage = 5;
  public readonly items = toSignal(this.store.select(selectProfiles), {
    initialValue: [],
  });
  public totalPages = computed(() => {
    return this.pagination().totalPages;
  });
  public ngOnInit() {
    this.formFilter()
      .searchForm.valueChanges.pipe(debounceTime(300))
      .subscribe((data) => {
        this.store.dispatch(profileActions.filterEvents(data));
      });
    this.store.dispatch(
      profileActions.loadProfiles({
        filters: {},
        pagination: { currentPage: 1, perPage: 5 },
      })
    );
  }

  public onChangeCurrentPate(page: number) {
    this.store.dispatch(
      profileActions.paginationProfiles({ currentPage: page })
    );
  }

  public onGoTo(page: number): void {
    this.onChangeCurrentPate(page);
  }

  public onNext(page: number): void {
    this.onChangeCurrentPate(page + 1);
  }

  public onPrevious(page: number): void {
    this.onChangeCurrentPate(page - 1);
  }
}
