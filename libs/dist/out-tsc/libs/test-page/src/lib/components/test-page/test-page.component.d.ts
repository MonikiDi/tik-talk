import { NgForm } from '@angular/forms';
export declare class TestPageComponent {
    person: {
        name: string;
        lastName: string;
        address: {
            street: string;
            building: number;
        };
    };
    hobby: string;
    onChange(value: any): void;
    onSubmit(form: NgForm): void;
}
//# sourceMappingURL=test-page.component.d.ts.map