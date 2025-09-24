import { __decorate } from "tslib";
import { Directive } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
let NoReactValidator = class NoReactValidator {
    change;
    validate(control) {
        console.log(control.value);
        return control.value.toLowerCase() === 'react'
            ? { noReact: { message: `Никаких Реактов ${control.status}` } }
            : null;
    }
    registerOnValidatorChange(fn) {
        this.change = fn;
    }
};
NoReactValidator = __decorate([
    Directive({
        standalone: true,
        selector: '[noReact]',
        providers: [{
                provide: NG_VALIDATORS,
                useExisting: NoReactValidator,
                multi: true
            }]
    })
], NoReactValidator);
export { NoReactValidator };
//# sourceMappingURL=no-react.validator.js.map