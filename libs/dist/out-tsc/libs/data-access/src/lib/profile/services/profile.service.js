import { __decorate } from "tslib";
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
let ProfileService = class ProfileService {
    http = inject(HttpClient);
    baseApiUrl = '/yt-course/';
    store = inject(Store);
    getMe() {
        return this.http.get(`${this.baseApiUrl}account/me`);
    }
    getAccount(id) {
        return this.http.get(`${this.baseApiUrl}account/${id}`);
    }
    patchProfile(profile) {
        return this.http.patch(`${this.baseApiUrl}account/me`, profile);
    }
    uploadAvatar(file) {
        const fd = new FormData();
        fd.append('image', file);
        return this.http.post(`${this.baseApiUrl}account/upload_image`, fd);
    }
    query(params, pagination) {
        return this.http.get(`${this.baseApiUrl}account/accounts`, {
            params: {
                ...params,
                page: pagination?.page || 1,
                size: pagination?.perPage || 50,
            },
        });
    }
};
ProfileService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], ProfileService);
export { ProfileService };
//# sourceMappingURL=profile.service.js.map