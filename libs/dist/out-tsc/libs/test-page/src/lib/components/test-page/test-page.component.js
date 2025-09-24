import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoReactValidator } from '../../directive/no-react.validator';
let TestPageComponent = class TestPageComponent {
    person = {
        name: '',
        lastName: '',
        address: {
            street: '',
            building: 0
        }
    };
    hobby = '';
    onChange(value) {
        this.person.name = value;
        // console.log(value);
    }
    // onSubmit(event: SubmitEvent) {
    //   console.log(event.target);
    //   //@ts-ignore
    //   console.log(window.ng.getDirectives(event.target)[2].value);
    // }
    onSubmit(form) {
        console.log(form);
    }
};
TestPageComponent = __decorate([
    Component({
        selector: 'tt-test-page',
        standalone: true,
        imports: [CommonModule, FormsModule, NoReactValidator],
        templateUrl: './test-page.component.html',
        styleUrl: './test-page.component.scss',
    })
], TestPageComponent);
export { TestPageComponent };
//# sourceMappingURL=test-page.component.js.map