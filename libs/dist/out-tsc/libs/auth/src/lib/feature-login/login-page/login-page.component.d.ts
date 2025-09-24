import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@tt/data-access';
export declare class LoginPageComponent {
    authService: AuthService;
    router: Router;
    isPasswordVisible: import("@angular/core").WritableSignal<boolean>;
    form: FormGroup<{
        username: FormControl<string | null>;
        password: FormControl<string | null>;
    }>;
    onSubmit(): void;
}
//# sourceMappingURL=login-page.component.d.ts.map