import { __decorate } from "tslib";
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
var ReceiverType;
(function (ReceiverType) {
    ReceiverType["PERSON"] = "PERSON";
    ReceiverType["LEGAL"] = "LEGAL";
})(ReceiverType || (ReceiverType = {}));
let DeliveryPageComponent = class DeliveryPageComponent {
    #fb = inject(FormBuilder);
    ReceiverType = ReceiverType;
    form = new FormGroup({
        type: new FormControl(ReceiverType.PERSON),
        // name: new FormControl<string>({value: '', disabled: true}, Validators.required),
        name: new FormControl('', Validators.required),
        inn: new FormControl(''),
        lastName: new FormControl(''),
        address: new FormGroup({
            city: new FormControl(''),
            street: new FormControl(''),
            building: new FormControl(null),
            apartment: new FormControl(null)
        })
    });
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
    constructor() {
        this.form.controls.type.valueChanges.pipe(takeUntilDestroyed()).subscribe(val => {
            // console.log('type event');
            this.form.controls.inn.clearValidators();
            if (val === ReceiverType.LEGAL) {
                this.form.controls.inn.setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10)]);
            }
        });
        // this.form.valueChanges.subscribe(val => {
        //   console.log(val);
        // })
        // this.form.controls.lastName.disable()
    }
    onSubmit(event) {
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
        console.log(this.form);
        console.log(this.form.getRawValue());
        // console.log(this.form.value);
        this.form.reset();
        if (this.form.invalid)
            return;
    }
};
DeliveryPageComponent = __decorate([
    Component({
        selector: 'tt-delivery-page',
        standalone: true,
        imports: [CommonModule, ReactiveFormsModule],
        templateUrl: './delivery-page.component.html',
        styleUrl: './delivery-page.component.scss'
    })
], DeliveryPageComponent);
export { DeliveryPageComponent };
//# sourceMappingURL=delivery-page.component.js.map