import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pageble } from '@tt/shared';
import { Profile } from '@tt/interfaces/profile';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionsService {
  http = inject(HttpClient);
  baseApiUrl = '/yt-course/';

  getSubscriptionsShortList(subsAmount = 6) {
    return this.http
      .get<Pageble<Profile>>(`${this.baseApiUrl}account/subscriptions/`)
      .pipe(map((res) => res.items.slice(0, subsAmount)));
  }

  getSubscriptionsNumber() {
    return this.http
      .get<Pageble<Profile>>(`${this.baseApiUrl}account/subscriptions/`)
      .pipe(map((res) => res.items.length));
  }
}
