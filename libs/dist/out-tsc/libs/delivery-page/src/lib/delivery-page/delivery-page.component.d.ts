import { FormControl, FormGroup } from '@angular/forms';
declare enum ReceiverType {
    PERSON = "PERSON",
    LEGAL = "LEGAL"
}
export declare class DeliveryPageComponent {
    #private;
    ReceiverType: typeof ReceiverType;
    form: FormGroup<{
        type: FormControl<ReceiverType | null>;
        name: FormControl<string | null>;
        inn: FormControl<string | null>;
        lastName: FormControl<string | null>;
        address: FormGroup<{
            city: FormControl<string | null>;
            street: FormControl<string | null>;
            building: FormControl<number | null>;
            apartment: FormControl<number | null>;
        }>;
    }>;
    constructor();
    onSubmit(event: SubmitEvent): void;
}
export {};
//# sourceMappingURL=delivery-page.component.d.ts.map