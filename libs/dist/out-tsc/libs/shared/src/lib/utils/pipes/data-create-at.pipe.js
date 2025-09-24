import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
import { DatePipe } from '@angular/common';
let DataCreateAtPipe = class DataCreateAtPipe {
    timeWorld = {
        s: ['секунда', 'секунды', 'секунд'],
        m: ['минута', 'минуты', 'минут'],
        h: ['час', 'часа', 'часов'],
        d: ['день', 'дня', 'дней']
    };
    endingsTimeWords(number, type) {
        let result = '';
        switch (number >= 20 ? number % 10 : number) {
            case 1:
                result = this.timeWorld[type][0];
                break;
            case 2:
            case 3:
            case 4:
                result = this.timeWorld[type][1];
                break;
            default:
                result = this.timeWorld[type][2];
        }
        return result;
    }
    transform(date) {
        if (!date)
            return null;
        const createAtDate = Date.parse(date);
        const iso = new Date().getTimezoneOffset();
        const createAtIsoDate = new Date(createAtDate + iso * 60 * -1000);
        const nowDate = new Date();
        // let hour: number = createAtIsoDate.getHours();
        // let minutes: number = createAtIsoDate.getMinutes();
        // let dayOfMonth: number = createAtIsoDate.getDate();
        // let month: number = createAtIsoDate.getMonth();
        // let year: number = createAtIsoDate.getFullYear();
        let diffMs = nowDate.getTime() - createAtIsoDate.getTime();
        let diffSec = Math.round(diffMs / 1000);
        let diffMin = Math.round(diffSec / 60);
        let diffHour = Math.round(diffMin / 60);
        let diffDayOfMonth = Math.round(diffHour / 24);
        if (diffSec < 1) {
            return 'прямо сейчас';
        }
        else if (diffMin < 1) {
            return `${diffSec} ${this.endingsTimeWords(diffSec, 's')}  назад`;
        }
        else if (diffHour < 1) {
            return `${diffMin} ${this.endingsTimeWords(diffMin, 'm')}  назад `;
        }
        else if (diffHour < 24) {
            return `${diffHour} ${this.endingsTimeWords(diffHour, 'h')}  назад`;
        }
        else if (diffDayOfMonth < 32) {
            return `${diffDayOfMonth} ${this.endingsTimeWords(diffDayOfMonth, 'd')} назад`;
        }
        else {
            const transformAtDate = Date.parse(`${createAtIsoDate}`);
            const datePipe = new DatePipe('en-US');
            return datePipe.transform(transformAtDate, 'dd.MM.YYYY hh:mm') || '';
        }
    }
};
DataCreateAtPipe = __decorate([
    Pipe({
        name: 'dataCreateAt',
        standalone: true
    })
], DataCreateAtPipe);
export { DataCreateAtPipe };
//# sourceMappingURL=data-create-at.pipe.js.map