import { __decorate } from "tslib";
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
var ReceiverType;
(function (ReceiverType) {
    ReceiverType["PERSON"] = "PERSON";
    ReceiverType["LEGAL"] = "LEGAL";
})(ReceiverType || (ReceiverType = {}));
let DeliveryPageComponent = class DeliveryPageComponent {
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
        type: this.#fb.nonNullable.control(ReceiverType.PERSON),
        name: this.#fb.control('', Validators.required),
        inn: this.#fb.control(''),
        lastName: this.#fb.control('ЗНАЧЕНИЕ'),
        address: this.#fb.group({
            city: this.#fb.control(''),
            street: this.#fb.control(''),
            building: this.#fb.control(null),
            apartment: this.#fb.control(null)
        })
    });
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