import { OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
export declare class ProfileFiltersComponent implements OnInit {
    store: Store<any>;
    readonly searchForm: FormGroup<{
        firstName: FormControl<string>;
        lastName: FormControl<string>;
        city: FormControl<string>;
        stack: FormControl<string>;
    }>;
    fillForm(): void;
    ngOnInit(): void;
}
//# sourceMappingURL=profile-filters.component.d.ts.map