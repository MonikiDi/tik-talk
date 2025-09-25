import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
const MOCK_DATA1 = [
    { 'city': 'Москва', 'street': 'Ленина', 'building': 115, 'apartment': 1 },
    { 'city': 'Санкт-Петербург', 'street': 'Заставская', 'building': 15, 'apartment': 51 }
];
const MOCK_DATA2 = [
    {
        code: 'lift',
        label: 'Подъем на этаж',
        value: false
    },
    {
        code: 'strong-package',
        label: 'Усиленная упаковка',
        value: true
    },
    {
        code: 'fast',
        label: 'Ускоренная доставка',
        value: true
    }
];
let MockService = class MockService {
    getAddressData() {
        return of(MOCK_DATA1);
    }
    getFeatures() {
        return of(MOCK_DATA2);
    }
};
MockService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], MockService);
export { MockService };
//# sourceMappingURL=mock.service.js.map