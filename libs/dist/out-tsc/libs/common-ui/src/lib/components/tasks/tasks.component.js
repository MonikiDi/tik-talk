import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
let TasksComponent = class TasksComponent {
    profile = input.required();
};
TasksComponent = __decorate([
    Component({
        selector: 'app-tasks',
        standalone: true,
        imports: [],
        templateUrl: './tasks.component.html',
        styleUrl: './tasks.component.scss',
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
], TasksComponent);
export { TasksComponent };
//# sourceMappingURL=tasks.component.js.map