import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, inject, } from '@angular/core';
import { ImgUrlPipe, SvgIconComponent } from '@tt/common-ui';
import { AsyncPipe, NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SubscriberCardComponent } from '@tt/subscribers';
import { Store } from '@ngrx/store';
import { profileActions, selectProfileMe, selectUnread, SubscriberService, } from '@tt/data-access';
let SidebarComponent = class SidebarComponent {
    subcriberService = inject(SubscriberService);
    store = inject(Store);
    subscribers$ = this.subcriberService.getSubscribersShortList();
    me = this.store.selectSignal(selectProfileMe);
    unread = this.store.selectSignal(selectUnread);
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
};
SidebarComponent = __decorate([
    Component({
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
], SidebarComponent);
export { SidebarComponent };
//# sourceMappingURL=sidebar.component.js.map