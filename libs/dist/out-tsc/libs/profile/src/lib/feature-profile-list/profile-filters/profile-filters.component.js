import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, inject, } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SvgIconComponent } from '@tt/common-ui';
import { Store } from '@ngrx/store';
import { selectFilteredProfiles } from '@tt/data-access';
let ProfileFiltersComponent = class ProfileFiltersComponent {
    store = inject(Store);
    searchForm = new FormGroup({
        firstName: new FormControl('', { nonNullable: true }),
        lastName: new FormControl('', { nonNullable: true }),
        city: new FormControl('', { nonNullable: true }),
        stack: new FormControl('', { nonNullable: true }),
    });
    // Заполнить форму из стора
    fillForm() {
        const data = this.store.selectSignal(selectFilteredProfiles);
        this.searchForm.patchValue(data());
    }
    ngOnInit() {
        this.fillForm();
    }
};
ProfileFiltersComponent = __decorate([
    Component({
        selector: 'app-profile-filters',
        standalone: true,
        imports: [ReactiveFormsModule, SvgIconComponent],
        templateUrl: './profile-filters.component.html',
        styleUrl: './profile-filters.component.scss',
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
], ProfileFiltersComponent);
export { ProfileFiltersComponent };
//# sourceMappingURL=profile-filters.component.js.map