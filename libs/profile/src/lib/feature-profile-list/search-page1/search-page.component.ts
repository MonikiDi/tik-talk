import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  Signal,
  viewChild,
} from '@angular/core';
import { ProfileFiltersComponent } from '../profile-filters/profile-filters.component';
import { PaginationPageComponent } from '@tt/common-ui';
import { ProfileCardComponent } from '../../ui/profile-card/profile-card.component';
import { debounceTime } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import {
  profileActions,
  selectFilteredProfiles,
  selectLoadingProfiles,
  selectPagination,
  selectProfiles,
} from '@tt/data-access';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPageComponent implements OnInit {
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
        filters: this.store.selectSignal(selectFilteredProfiles)(),
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
