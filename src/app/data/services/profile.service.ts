import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Profile } from '../interfaces/profile.interface';
import { Pageble } from '../interfaces/pageble.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http = inject(HttpClient);

  baseApiUrl = 'https://icherniakov.ru/yt-course/';

  getTestAccoounts() {
    return this.http.get<Profile[]>(`${this.baseApiUrl}account/test_accounts`);
  }

  getMe() {
    return this.http.get<Profile>(`${this.baseApiUrl}account/me`);
  }

  getSubscribersShortList() {
    return this.http.get<Pageble<Profile>>(
      `${this.baseApiUrl}account/subscribers`
    );
  }
}
