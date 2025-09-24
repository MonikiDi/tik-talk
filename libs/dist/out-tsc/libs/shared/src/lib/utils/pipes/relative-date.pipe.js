import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
import { DatePipe } from '@angular/common';
let RelativeDatePipe = class RelativeDatePipe {
    transform(value) {
        if (!value) {
            return null;
        }
        const date = new Date(value);
        const now = new Date();
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        if (date.toDateString() === now.toDateString()) {
            return 'Сегодня';
        }
        else if (date.toDateString() === yesterday.toDateString()) {
            return 'Вчера';
        }
        else {
            const datePipe = new DatePipe('en-US');
            return datePipe.transform(date, 'dd.MM.YYYY') || ''.toString();
        }
    }
};
RelativeDatePipe = __decorate([
    Pipe({
        standalone: true,
        name: 'relativeDate'
    })
], RelativeDatePipe);
export { RelativeDatePipe };
//# sourceMappingURL=relative-date.pipe.js.map