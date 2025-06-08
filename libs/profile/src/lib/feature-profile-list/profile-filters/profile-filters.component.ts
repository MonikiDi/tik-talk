import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SvgIconComponent } from '@tt/common-ui';
import { Store } from '@ngrx/store';
import { selectFilteredProfiles } from '@tt/data-access';

@Component({
  selector: 'app-profile-filters',
  standalone: true,
  imports: [ReactiveFormsModule, SvgIconComponent],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss',
})
export class ProfileFiltersComponent implements OnInit {
  store = inject(Store);
  public readonly searchForm = new FormGroup({
    firstName: new FormControl('', { nonNullable: true }),
    lastName: new FormControl('', { nonNullable: true }),
    city: new FormControl('', { nonNullable: true }),
    stack: new FormControl('', { nonNullable: true }),
  });

  // Заполнить форму из стора
  fillForm() {
    const data = this.store.selectSignal(selectFilteredProfiles);
    this.searchForm.patchValue(data());
  }
  ngOnInit() {
    this.fillForm();
  }
}
