import { __decorate } from "tslib";
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
let SubscriberService = class SubscriberService {
    http = inject(HttpClient);
    baseApiUrl = '/yt-course/';
    getSubscribersShortList(subsAmount = 3) {
        return this.http
            .get(`${this.baseApiUrl}account/subscribers/`)
            .pipe(map((res) => res.items.slice(0, subsAmount)));
    }
    onSubscriber(accountId) {
        return this.http.post(`${this.baseApiUrl}account/subscribe/${accountId}`, {});
    }
    onUnsubscribe(accountId) {
        return this.http.delete(`${this.baseApiUrl}account/subscribe/${accountId}`, {});
    }
};
SubscriberService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], SubscriberService);
export { SubscriberService };
//# sourceMappingURL=subscriber.service.js.map