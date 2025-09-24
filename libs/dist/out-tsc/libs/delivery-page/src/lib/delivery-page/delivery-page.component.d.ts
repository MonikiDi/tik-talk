import { FormGroup } from '@angular/forms';
declare enum ReceiverType {
    PERSON = "PERSON",
    LEGAL = "LEGAL"
}
export declare class DeliveryPageComponent {
    #private;
    ReceiverType: typeof ReceiverType;
    form: FormGroup<{
        type: import("@angular/forms").FormControl<ReceiverType>;
        name: import("@angular/forms").FormControl<string | null>;
        inn: import("@angular/forms").FormControl<string | null>;
        lastName: import("@angular/forms").FormControl<string | null>;
        address: FormGroup<{
            city: import("@angular/forms").FormControl<string | null>;
            street: import("@angular/forms").FormControl<string | null>;
            building: import("@angular/forms").FormControl<number | null>;
            apartment: import("@angular/forms").FormControl<number | null>;
        }>;
    }>;
    constructor();
    onSubmit(event: SubmitEvent): void;
}
export {};
//# sourceMappingURL=delivery-page.component.d.ts.map