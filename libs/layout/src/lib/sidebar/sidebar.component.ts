import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnInit,
} from '@angular/core';
import { ImgUrlPipe, SvgIconComponent } from '@tt/common-ui';
import { AsyncPipe, NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SubscriberCardComponent } from '@tt/subscribers';
import { Store } from '@ngrx/store';
import {
  profileActions,
  selectProfileMe,
  selectUnread,
  SubscriberService,
} from '@tt/data-access';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit {
  private readonly subcriberService = inject(SubscriberService);
  private readonly store = inject(Store);
  public readonly subscribers$ =
    this.subcriberService.getSubscribersShortList();

  public readonly me = this.store.selectSignal(selectProfileMe);
  public readonly unread = this.store.selectSignal(selectUnread);

  public readonly menuItems = [
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
    {
      label: 'Доставка',
      icon: 'delivery-page',
      link: 'delivery-page',
    },
    {
      label: 'Тест страница',
      icon: 'test-page',
      link: 'test-page',
    },
  ];

  ngOnInit() {
    this.store.dispatch(profileActions.loadGetMe());
  }
}
