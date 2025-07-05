import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pageble } from '@tt/shared';
import { Profile } from '@tt/interfaces/profile';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubscriberService {
  http = inject(HttpClient);
  baseApiUrl = '/yt-course/';

  getSubscribersShortList(subsAmount = 3) {
    return this.http
      .get<Pageble<Profile>>(`${this.baseApiUrl}account/subscribers/`)
      .pipe(map((res) => res.items.slice(0, subsAmount)));
  }

  onSubscriber(accountId: number) {
    return this.http.post(
      `${this.baseApiUrl}account/subscribe/${accountId}`,
      {}
    );
  }

  onUnsubscribe(accountId: number) {
    return this.http.delete(
      `${this.baseApiUrl}account/subscribe/${accountId}`,
      {}
    );
  }
}
