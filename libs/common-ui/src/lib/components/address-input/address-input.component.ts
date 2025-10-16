import { ChangeDetectionStrategy, Component, DestroyRef, forwardRef, inject, OnInit, signal } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { TtInputComponent } from '@tt/common-ui';
import { DadataService } from '@tt/data-access';
import { debounceTime, switchMap, tap } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { DadataSuggestion } from '@tt/interfaces/dadata';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-address-input',
  standalone: true,
  imports: [
    TtInputComponent,
    ReactiveFormsModule,
    AsyncPipe,
    JsonPipe
  ],
  templateUrl: './address-input.component.html',
  styleUrl: './address-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AddressInputComponent)
    }
  ]

})
export class AddressInputComponent implements ControlValueAccessor, OnInit {
  #dadataService = inject(DadataService);
  destroyRef = inject(DestroyRef);
  innerSearchControl = new FormControl();
  addressForm = new FormGroup({
    city: new FormControl(''),
    street: new FormControl(''),
    building: new FormControl(''),
    apartment: new FormControl('')
  });
  addressValue = {};

  isDropdownOpened = signal<boolean>(true);

  ngOnInit() {
    this.addressForm.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(formValues => {
      this.addressValue = formValues;
      this.onChange(JSON.stringify(this.addressValue));
    });
  }

  suggestions$ = this.innerSearchControl.valueChanges
    .pipe(
      debounceTime(500),
      switchMap(val => {
        return this.#dadataService.getSuggestion(val)
          .pipe(
            tap(res => {
              this.isDropdownOpened.set(!!res.length);
            })
          );
      })
    );


  writeValue(address: string): void {
    if (address) {
      this.addressForm.patchValue({
        city: JSON.parse(address).city,
        street: JSON.parse(address).street,
        building: JSON.parse(address).building,
        apartment: JSON.parse(address).apartment
      });
    }
  }

  setDisabledState(isDisabled: boolean): void {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onChange(value: string): void {
  }

  onTouched() {
  }

  onSuggestionPick(suggest: DadataSuggestion) {
    this.isDropdownOpened.set(false);
    this.innerSearchControl.patchValue(suggest.value, {
      emitEvent: false
    });
    this.addressValue = {
      city: suggest.data.city,
      street: suggest.data.street,
      building: suggest.data.house,
      apartment: suggest.data.flat
    };
    this.addressForm.patchValue(this.addressValue);
    this.onChange(JSON.stringify(this.addressValue));
  }
}
