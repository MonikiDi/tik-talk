import {Component, DestroyRef, inject, Input, input, output, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ProfileService} from '../../../data/services/profile.service';
import {debounceTime, startWith, Subject, switchMap} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-profile-filters',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss'
})
export class ProfileFiltersComponent {
  public readonly searchForm = new FormGroup({
    firstName: new FormControl('', {nonNullable: true}),
    lastName: new FormControl('', {nonNullable: true}),
    stack: new FormControl('', {nonNullable: true})
  })
}
