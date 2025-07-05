import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pageble } from '@tt/shared';
import { Profile, QueryParamsProfile } from '@tt/interfaces/profile';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http = inject(HttpClient);
  baseApiUrl = '/yt-course/';
  store = inject(Store);

  getMe() {
    return this.http.get<Profile>(`${this.baseApiUrl}account/me`);
  }

  getAccount(id: string) {
    return this.http.get<Profile>(`${this.baseApiUrl}account/${id}`);
  }

  patchProfile(profile: Partial<Profile>) {
    return this.http.patch<Profile>(`${this.baseApiUrl}account/me`, profile);
  }

  uploadAvatar(file: File) {
    const fd = new FormData();
    fd.append('image', file);
    return this.http.post<Profile>(
      `${this.baseApiUrl}account/upload_image`,
      fd
    );
  }

  query(
    params?: Partial<QueryParamsProfile>,
    pagination?: {
      page: number;
      perPage: number;
    }
  ) {
    return this.http.get<Pageble<Profile>>(
      `${this.baseApiUrl}account/accounts`,
      {
        params: {
          ...params,
          page: pagination?.page || 1,
          size: pagination?.perPage || 50,
        },
      }
    );
  }
}
