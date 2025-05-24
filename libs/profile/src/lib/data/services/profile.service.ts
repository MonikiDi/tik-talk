import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { tap } from 'rxjs';
import { GlobalStoreService, Pageble, Pagination } from '@tt/shared';
import { Profile, QueryParamsProfile } from '@tt/interfaces/profile';

const DEFAULT_PAGINATION: Pagination = {
  total: 0,
  currentPage: 0,
  perPage: 0,
  totalPages: 0,
};

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http = inject(HttpClient);
  #globalStoreService = inject(GlobalStoreService);
  baseApiUrl = 'https://icherniakov.ru/yt-course/';

  me = signal<Profile | null>(null);
  profiles = signal<Profile[]>([]);
  pagination = signal<Pagination>(DEFAULT_PAGINATION);

  getMe() {
    return this.http.get<Profile>(`${this.baseApiUrl}account/me`).pipe(
      tap((res) => {
        this.me.set(res);
        this.#globalStoreService.me.set(res);
      })
    );
  }

  getAccount(id: string) {
    return this.http.get<Profile>(`${this.baseApiUrl}account/${id}`);
  }

  patchProfile(profile: Partial<Profile>) {
    return this.http
      .patch<Profile>(`${this.baseApiUrl}account/me`, profile)
      .pipe(
        tap((response) => {
          this.me.set(response);
        })
      );
  }

  uploadAvatar(file: File) {
    const fd = new FormData();
    fd.append('image', file);
    return this.http
      .post<Profile>(`${this.baseApiUrl}account/upload_image`, fd)
      .pipe(
        tap((response) => {
          this.me.set(response);
        })
      );
  }

  query(
    params?: Partial<QueryParamsProfile>,
    pagination?: {
      page: number;
      perPage: number;
    }
  ) {
    console.log(params);
    return this.http
      .get<Pageble<Profile>>(`${this.baseApiUrl}account/accounts`, {
        params: {
          ...params,
          page: pagination?.page || 1,
          size: pagination?.perPage || 50,
        },
      })
      .pipe(
        tap((res) => {
          this.pagination.set({
            total: res.total,
            currentPage: res.page,
            perPage: res.size,
            totalPages: res.pages,
          });
          this.profiles.set(res.items);
        })
      );
  }
}
