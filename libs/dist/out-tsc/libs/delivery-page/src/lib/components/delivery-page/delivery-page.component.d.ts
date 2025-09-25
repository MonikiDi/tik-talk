import { ElementRef, Renderer2 } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, FormRecord } from '@angular/forms';
import { Feature, MockService } from '../../services/mock.service';
declare enum ReceiverType {
    PERSON = "PERSON",
    LEGAL = "LEGAL"
}
export declare class DeliveryPageComponent {
    hostElement: ElementRef<any>;
    r2: Renderer2;
    ReceiverType: typeof ReceiverType;
    mockService: MockService;
    features: Feature[];
    form: FormGroup<{
        type: FormControl<ReceiverType | null>;
        name: FormControl<string | null>;
        inn: FormControl<string | null>;
        lastName: FormControl<string | null>;
        addresses: FormArray<FormGroup<{
            city: FormControl<string | null>;
            street: FormControl<string | null>;
            building: FormControl<number | null>;
            apartment: FormControl<number | null>;
        }>>;
        feature: FormRecord<AbstractControl<any, any>>;
    }>;
    constructor();
    onSubmit(event: SubmitEvent): void;
    addAddress(): void;
    deleteAddress(index: number): void;
    sort: () => number;
    ngAfterViewInit(): void;
    onWindowResize(): void;
    resizeFeed(): void;
}
export {};
//# sourceMappingURL=delivery-page.component.d.ts.map