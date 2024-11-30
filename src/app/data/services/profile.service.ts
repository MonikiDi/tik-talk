import {HttpClient} from '@angular/common/http';
import {Injectable, inject, signal} from '@angular/core';
import {Profile} from '../interfaces/profile.interface';
import {Pageble} from '../interfaces/pageble.interface';
import {map, tap} from 'rxjs';

export interface Pagination {
  total: number;
  currentPage: number;
  perPage: number;
  totalPages: number;
}

const DEFAULT_PAGINATION: Pagination = {
  total: 0,
  currentPage: 0,
  perPage: 0,
  totalPages: 0
}

interface QueryParamsProfile {
  stack: string;
  firstName: string;
  lastName: string;
  city: string;
  orderBy: 'desc' | 'asc'
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http = inject(HttpClient);

  baseApiUrl = 'https://icherniakov.ru/yt-course/';

  me = signal<Profile | null>(null);
  profiles = signal<Profile[]>([]);
  pagination = signal<Pagination>(DEFAULT_PAGINATION);

  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseApiUrl}account/test_accounts`);
  }

  getMe() {
    return this.http
      .get<Profile>(`${this.baseApiUrl}account/me`)
      .pipe(tap((res) => this.me.set(res)));
  }

  getAccount(id: string) {
    return this.http.get<Profile>(`${this.baseApiUrl}account/${id}`);
  }

  getSubscribersShortList(subsAmount: number = 3) {
    return this.http
      .get<Pageble<Profile>>(`${this.baseApiUrl}account/subscribers/`)
      .pipe(map((res) => res.items.slice(0, subsAmount)));
  }

  patchProfile(profile: Partial<Profile>) {
    return this.http.patch<Profile>(`${this.baseApiUrl}account/me`, profile);
  }

  uploadAvatar(file: File) {
    const fd = new FormData();
    fd.append('image', file);
    return this.http.post<Profile>(`${this.baseApiUrl}account/upload_image`, fd);
  }

  query(params?: Partial<QueryParamsProfile>, pagination?: {
    perPage: number;
    page: number;
  }) {
    return this.http.get<Pageble<Profile>>(`${this.baseApiUrl}account/accounts`,
      {
        params: {
          ...params,
          page: pagination?.page || 1,
          size: pagination?.perPage || 50,
        }
      }
    ).pipe(
      tap((res) => {
        this.pagination.set({
          total: res.total,
          currentPage: res.page,
          perPage: res.size,
          totalPages: res.pages,
        })
        this.profiles.set(res.items)
      }),
    )
  }
}
