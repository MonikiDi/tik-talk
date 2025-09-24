import { __decorate } from "tslib";
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
let SubscriptionsService = class SubscriptionsService {
    http = inject(HttpClient);
    baseApiUrl = '/yt-course/';
    getSubscriptionsShortList(subsAmount = 6) {
        return this.http
            .get(`${this.baseApiUrl}account/subscriptions/`)
            .pipe(map((res) => res.items.slice(0, subsAmount)));
    }
    getSubscriptionsNumber() {
        return this.http
            .get(`${this.baseApiUrl}account/subscriptions/`)
            .pipe(map((res) => res.items.length));
    }
};
SubscriptionsService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], SubscriptionsService);
export { SubscriptionsService };
//# sourceMappingURL=subscriptions.service.js.map