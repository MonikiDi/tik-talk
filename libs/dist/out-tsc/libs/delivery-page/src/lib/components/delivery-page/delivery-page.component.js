import { __decorate } from "tslib";
import { Component, ElementRef, HostListener, inject, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, FormRecord, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MockService } from '../../services/mock.service';
import { Debounce } from '@tt/shared';
var ReceiverType;
(function (ReceiverType) {
    ReceiverType["PERSON"] = "PERSON";
    ReceiverType["LEGAL"] = "LEGAL";
})(ReceiverType || (ReceiverType = {}));
function getAddressForm(initialValue = {}) {
    return new FormGroup({
        city: new FormControl(initialValue.city ?? ''),
        street: new FormControl(initialValue.street ?? ''),
        building: new FormControl(initialValue.building ?? null),
        apartment: new FormControl(initialValue.apartment ?? null)
    });
}
const validateStartWith = (control) => {
    return control.value.startsWith('я')
        ? { startsWith: 'Я - последняя буква в алфавите' }
        : null;
};
let DeliveryPageComponent = class DeliveryPageComponent {
    hostElement = inject(ElementRef);
    r2 = inject(Renderer2);
    ReceiverType = ReceiverType;
    mockService = inject(MockService);
    features = [];
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
    form = new FormGroup({
        type: new FormControl(ReceiverType.PERSON),
        // name: new FormControl<string>({value: '', disabled: true}, Validators.required),
        name: new FormControl('', [Validators.required, validateStartWith]),
        inn: new FormControl(''),
        lastName: new FormControl(''),
        addresses: new FormArray([getAddressForm()]),
        feature: new FormRecord({})
    });
    constructor() {
        this.mockService.getAddressData()
            .pipe(takeUntilDestroyed())
            .subscribe(addrs => {
            // while (this.form.controls.addresses.controls.length > 0) {
            //   this.form.controls.addresses.removeAt(0);
            // }
            this.form.controls.addresses.clear();
            for (const addr of addrs) {
                this.form.controls.addresses.push(getAddressForm(addr));
            }
        });
        this.mockService.getFeatures()
            .pipe(takeUntilDestroyed())
            .subscribe(features => {
            this.features = features;
            for (const feature of features) {
                this.form.controls.feature.addControl(feature.code, new FormControl(feature.value));
            }
        });
        this.form.controls.type.valueChanges.pipe(takeUntilDestroyed()).subscribe(val => {
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
        if (this.form.invalid)
            return;
        console.log(this.form.getRawValue());
        this.form.reset({ type: ReceiverType.PERSON });
    }
    addAddress() {
        // this.form.controls.addresses.push(getAddressForm())
        this.form.controls.addresses.insert(0, getAddressForm());
    }
    deleteAddress(index) {
        this.form.controls.addresses.removeAt(index, {
            emitEvent: false
        });
    }
    sort = () => 0;
    ngAfterViewInit() {
        this.resizeFeed();
    }
    onWindowResize() {
        this.resizeFeed();
    }
    resizeFeed() {
        const { top } = this.hostElement.nativeElement.getBoundingClientRect();
        const height = window.innerHeight - top - 48;
        this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
    }
};
__decorate([
    Debounce(20),
    HostListener('window: resize')
], DeliveryPageComponent.prototype, "onWindowResize", null);
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