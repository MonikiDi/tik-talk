import { FormBuilder } from '@angular/forms';
import { AvatarUploadComponent } from '../../ui/avatar-upload/avatar-upload.component';
import { Store } from '@ngrx/store';
export declare class SettingsPageComponent {
    fb: FormBuilder;
    store: Store<any>;
    profile$: import("rxjs").Observable<import("@tt/interfaces/profile").Profile | undefined>;
    avatarUploader: AvatarUploadComponent;
    form: import("@angular/forms").FormGroup<{
        firstName: import("@angular/forms").FormControl<string | null>;
        lastName: import("@angular/forms").FormControl<string | null>;
        username: import("@angular/forms").FormControl<string | null>;
        description: import("@angular/forms").FormControl<string | null>;
        city: import("@angular/forms").FormControl<string | null>;
        stack: import("@angular/forms").FormControl<string | null>;
    }>;
    constructor();
    onSave(): void;
    splitStack(stack: string | null | string[] | undefined): string[];
    mergeStack(stack: string | null | string[] | undefined): string;
}
//# sourceMappingURL=settings-page.component.d.ts.map