import {
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
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
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { ProfileService } from '../../data/services/profile.service';

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

  public formFilter = viewChild.required(ProfileFiltersComponent);

  public currentPage = signal<number>(1);
  public currentPage$ = toObservable(this.currentPage);

  public perPage = 5;
  public items = this.profileService.profiles;
  public pagination = this.profileService.pagination;

  public totalPages = computed(() => {
    return this.pagination().totalPages;
  });
  public readonly isPending = signal(false);

  public ngOnInit() {
    this.formFilter().searchForm.valueChanges.subscribe({
      next: () => {
        this.currentPage.set(1);
      },
    });

    combineLatest([
      this.formFilter().searchForm.valueChanges.pipe(
        startWith(this.formFilter().searchForm.value),
        debounceTime(100),
        tap(() => {
          this.isPending.set(true);
        })
      ),
      this.currentPage$.pipe(
        tap(() => {
          this.isPending.set(true);
        })
      ),
    ])
      .pipe(
        switchMap(([params, currentPage]) => {
          return this.profileService
            .query(params, {
              page: currentPage,
              perPage: this.perPage,
            })
            .pipe(
              finalize(() => {
                this.isPending.set(false);
              })
            );
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  public onGoTo(page: number): void {
    this.currentPage.set(page);
  }

  public onNext(page: number): void {
    this.currentPage.set(page + 1);
  }

  public onPrevious(page: number): void {
    this.currentPage.set(page - 1);
  }
}
