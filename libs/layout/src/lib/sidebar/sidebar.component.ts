import { Component, inject, OnInit } from '@angular/core';
import { ImgUrlPipe, SvgIconComponent } from '@tt/common-ui';
import { AsyncPipe, NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SubscriberCardComponent, SubscriberService } from '@tt/subscribers';
import { Store } from '@ngrx/store';
import { profileActions, selectProfileMe } from '@tt/data-access';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SvgIconComponent,
    NgFor,
    RouterLink,
    AsyncPipe,
    SubscriberCardComponent,
    ImgUrlPipe,
    RouterLinkActive,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  subcriberService = inject(SubscriberService);
  store = inject(Store);
  subscribers$ = this.subcriberService.getSubscribersShortList();

  ngOnInit() {
    this.store.dispatch(profileActions.loadGetMe());
  }

  me = this.store.selectSignal(selectProfileMe);

  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: 'profile/me',
    },
    {
      label: 'Чаты',
      icon: 'chats',
      link: 'chats',
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search',
    },
  ];
}
