import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


enum ReceiverType {
  PERSON = 'PERSON',
  LEGAL = 'LEGAL'
}

@Component({
  selector: 'tt-delivery-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './delivery-page.component.html',
  styleUrl: './delivery-page.component.scss'
})
export class DeliveryPageComponent {
  #fb = inject(FormBuilder);

  ReceiverType = ReceiverType;

  // form = new FormGroup({
  //   type: new FormControl<ReceiverType>(ReceiverType.PERSON),
  //   // name: new FormControl<string>({value: '', disabled: true}, Validators.required),
  //   name: new FormControl<string>( '', Validators.required),
  //   inn: new FormControl<string>(''),
  //   lastName: new FormControl<string>('ЗНАЧЕНИЕ'),
  //   address: new FormGroup({
  //     city: new FormControl<string>(''),
  //     street: new FormControl<string>(''),
  //     building: new FormControl<number | null>(null),
  //     apartment: new FormControl<number | null>(null)
  //   })
  // });

  form = this.#fb.group({
    type: this.#fb.nonNullable.control<ReceiverType>(ReceiverType.PERSON),
    name: this.#fb.control<string>('', Validators.required),
    inn: this.#fb.control<string>(''),
    lastName: this.#fb.control<string>('ЗНАЧЕНИЕ'),
    address: this.#fb.group({
      city: this.#fb.control<string>(''),
      street: this.#fb.control<string>(''),
      building: this.#fb.control<number | null>(null),
      apartment: this.#fb.control<number | null>(null)
    })
  });

  constructor() {
    this.form.controls.type.valueChanges.pipe(takeUntilDestroyed()).subscribe(val => {
      // console.log('type event');
      this.form.controls.inn.clearValidators();

      if (val === ReceiverType.LEGAL) {
        this.form.controls.inn.setValidators(
          [Validators.required, Validators.minLength(10), Validators.maxLength(10)]
        );
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
    //   // emitEvent: false
    //   // onlySelf: true
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

    console.log(this.form.getRawValue());
    // console.log(this.form.value);
    this.form.reset()

    if (this.form.invalid) return;
  }
}
