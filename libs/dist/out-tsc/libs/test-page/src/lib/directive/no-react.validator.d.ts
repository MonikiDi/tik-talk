import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';
export declare class NoReactValidator implements Validator {
    change: () => void;
    validate(control: AbstractControl): ValidationErrors | null;
    registerOnValidatorChange(fn: () => void): void;
}
//# sourceMappingURL=no-react.validator.d.ts.map