import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  }
)
export class SubscriberService {
  http = inject(HttpClient);
  baseApiUrl = 'https://icherniakov.ru/yt-course/';

  onSubscriber(accountId: number) {
    return this.http.post(`${this.baseApiUrl}account/subscribe/${accountId}`,{})
  }
}
