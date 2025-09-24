import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, inject, signal, } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@tt/data-access';
let LoginPageComponent = class LoginPageComponent {
    authService = inject(AuthService);
    router = inject(Router);
    isPasswordVisible = signal(false);
    form = new FormGroup({
        username: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required),
    });
    onSubmit() {
        if (this.form.valid) {
            // @ts-ignore
            this.authService.login(this.form.value).subscribe((res) => {
                this.router.navigate(['']);
            });
        }
    }
};
LoginPageComponent = __decorate([
    Component({
        selector: 'app-login-page',
        standalone: true,
        imports: [ReactiveFormsModule],
        templateUrl: './login-page.component.html',
        styleUrl: './login-page.component.scss',
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
], LoginPageComponent);
export { LoginPageComponent };
//# sourceMappingURL=login-page.component.js.map