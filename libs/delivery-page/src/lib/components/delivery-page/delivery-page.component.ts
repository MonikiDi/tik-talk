import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  inject,
  Renderer2,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  FormRecord,
  ReactiveFormsModule, ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Address, Feature, MockService } from '../../services/mock.service';
import { Debounce } from '@tt/shared';
import { ValidationError } from '@nx/angular/src/generators/ng-add/utilities';

enum ReceiverType {
  PERSON = 'PERSON',
  LEGAL = 'LEGAL',
}

function getAddressForm(initialValue: Address = {}) {
  return new FormGroup({
    city: new FormControl<string>(initialValue.city ?? ''),
    street: new FormControl<string>(initialValue.street ?? ''),
    building: new FormControl<number | null>(initialValue.building ?? null),
    apartment: new FormControl<number | null>(initialValue.apartment ?? null),
  });
}

const validateStartWith: ValidatorFn = (control: AbstractControl):ValidationErrors | null => {
  return control.value.startsWith('я')
    ? { startsWith: 'Я - последняя буква в алфавите' }
    : null;
};

@Component({
  selector: 'tt-delivery-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './delivery-page.component.html',
  styleUrl: './delivery-page.component.scss',
})
export class DeliveryPageComponent implements AfterViewInit {
  public hostElement = inject(ElementRef);
  public r2 = inject(Renderer2);
  ReceiverType = ReceiverType;

  mockService = inject(MockService);
  features: Feature[] = [];

  // #fb = inject(FormBuilder);
  // form = this.#fb.group({
  //   type: this.#fb.nonNullable.control<ReceiverType>(ReceiverType.PERSON),
  //   name: this.#fb.control<string>('', Validators.required),
  //   inn: this.#fb.control<string>(''),
  //   lastName: this.#fb.control<string>('ЗНАЧЕНИЕ'),
  //   address: this.#fb.group({
  //     city: this.#fb.control<string>(''),
  //     street: this.#fb.control<string>(''),
  //     building: this.#fb.control<number | null>(null),
  //     apartment: this.#fb.control<number | null>(null)
  //   })
  // });

  public form = new FormGroup({
    type: new FormControl<ReceiverType>(ReceiverType.PERSON),
    // name: new FormControl<string>({value: '', disabled: true}, Validators.required),
    name: new FormControl<string>('', [Validators.required, validateStartWith]),
    inn: new FormControl<string>(''),
    lastName: new FormControl<string>(''),
    addresses: new FormArray([getAddressForm()]),
    feature: new FormRecord({}),
  });

  constructor() {
    this.mockService
      .getAddressData()
      .pipe(takeUntilDestroyed())
      .subscribe((addrs) => {
        // while (this.form.controls.addresses.controls.length > 0) {
        //   this.form.controls.addresses.removeAt(0);
        // }
        this.form.controls.addresses.clear();

        for (const addr of addrs) {
          this.form.controls.addresses.push(getAddressForm(addr));
        }
      });

    this.mockService
      .getFeatures()
      .pipe(takeUntilDestroyed())
      .subscribe((features) => {
        this.features = features;

        for (const feature of features) {
          this.form.controls.feature.addControl(
            feature.code,
            new FormControl(feature.value)
          );
        }
      });

    this.form.controls.type.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((val) => {
        this.form.controls.inn.clearValidators();

        if (val === ReceiverType.LEGAL) {
          this.form.controls.inn.setValidators([
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
          ]);
        }
      });

    // this.form.valueChanges.subscribe(val => {
    //   console.log(val);
    // })

    // this.form.controls.lastName.disable()
  }

  onSubmit(event: SubmitEvent) {
    // const formPatch = {
    //   name: 'Alesha',
    //   lastName: 'Popovich'
    // }
    // this.form.setValue('всё')
    // this.form.controls.type.patchValue(ReceiverType.LEGAL, {
    //   emitEvent: false
    //   onlySelf: true
    // })
    // this.form.reset({
    //   type: ReceiverType.PERSON,
    //   name: 'LUCAS'
    // }, {
    // emitEvent: false
    // onlySelf: true
    // })
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;
    console.log(this.form.getRawValue());
    this.form.reset({ type: ReceiverType.PERSON });
  }

  addAddress() {
    // this.form.controls.addresses.push(getAddressForm())
    this.form.controls.addresses.insert(0, getAddressForm());
  }

  deleteAddress(index: number) {
    this.form.controls.addresses.removeAt(index, {
      emitEvent: false,
    });
  }

  sort = () => 0;

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
