import {Component, computed, DestroyRef, effect, inject, OnInit, signal, viewChild} from '@angular/core';
import {ProfileService} from '../../data/services/profile.service';
import {ProfileFiltersComponent} from './profile-filters/profile-filters.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {Profile} from '../../data/interfaces/profile.interface';
import {PaginationPageComponent} from './pagination-page/pagination-page.component';
import {ProfileCardComponent} from '../../common-ui/profile-card/profile-card.component';
import {AsyncPipe} from '@angular/common';
import {combineLatest, debounceTime, startWith, switchMap} from 'rxjs';
import {takeUntilDestroyed, toObservable} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [ProfileFiltersComponent, NgxPaginationModule, PaginationPageComponent, ProfileCardComponent, AsyncPipe],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent implements OnInit {
  public readonly destroyRef = inject(DestroyRef)
  public readonly profileService = inject(ProfileService)

  public formFilter = viewChild.required(ProfileFiltersComponent)
  // profiles = this.profileService.filteredProfiles



  public current = signal<number>(1);
  public current$ = toObservable(this.current)

  public perPage = 5;
  public items = this.profileService.profiles
  public pagination = this.profileService.pagination
  // public itemsToDisplay  = signal<Profile[]>([])
  // public total = this.profileService.pagination().totalPages

  public totalPages = computed(() => {
    console.log(this.pagination())
    return this.pagination().totalPages
  })


  public ngOnInit() {
    this.formFilter().searchForm.valueChanges.subscribe(
      {
        next: () => {
          this.current.set(1)
        }
      }
    )

    combineLatest([
      this.formFilter().searchForm.valueChanges.pipe(startWith(this.formFilter().searchForm.value), debounceTime(500)),
      this.current$
    ])
      .pipe(
      switchMap(([params, currentPage]) => {
        return this.profileService.query(params, {
          page: currentPage,
          perPage: this.perPage
        })
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe()
  }

  // constructor() {
  //   effect(() => {
  //     // console.log(this.items())
  //     // console.log(Math.ceil(this.items().length / this.perPage))
  //     // console.log(this.total)
  //     // console.log(this.paginate(this.current,this.perPage))
  //     // console.log(this.onGoTo(2))
  //     // this.onGoTo(1)
  //     // console.log(this.itemsToDisplay )
  //     // this.onNext(2)
  //     // console.log(this.itemsToDisplay )
  //     // this.onPrevious(1)
  //     // console.log(this.itemsToDisplay[0] )
  //   });
  // }
  //
  //
  //
  //
  // ngOnInit(): void {
  // }
  //
  public onGoTo(page: number): void {
    this.current.set(page)
    // this.items.set( this.paginate(this.current(), this.perPage));
  }

  public onNext(page: number): void {
    this.current.set(page + 1);
    // this.items.set(this.paginate(this.current(), this.perPage));
  }

  public onPrevious(page: number): void {
    this.current.set(page - 1)
    // this.items.set(this.paginate(this.current(, this.perPage));
  }

  public paginate(current: number, perPage: number, ): any {
    return [...this.items().slice((current - 1) * perPage).slice(0, perPage)];
  }
}
