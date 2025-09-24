import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
let DateUtcPipe = class DateUtcPipe {
    transform(date) {
        const nowDateUtcParse = Date.parse(date.toString());
        const iso = new Date().getTimezoneOffset();
        const nowUtcDate = new Date(nowDateUtcParse + -iso * 60 * 1000);
        return nowUtcDate.toString();
    }
};
DateUtcPipe = __decorate([
    Pipe({
        name: 'dateUtc',
        standalone: true,
    })
], DateUtcPipe);
export { DateUtcPipe };
//# sourceMappingURL=date-utc.pipe.js.map