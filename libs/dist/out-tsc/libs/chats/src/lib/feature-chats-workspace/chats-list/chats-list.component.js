import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, computed, ElementRef, HostListener, inject, Renderer2, } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SvgIconComponent } from '@tt/common-ui';
import { ChatsBtnComponent } from '../chats-btn/chats-btn.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Debounce } from '@tt/shared';
import { Store } from '@ngrx/store';
import { chatsActions, selectLastMessageChatMap } from '@tt/data-access';
let ChatsListComponent = class ChatsListComponent {
    hostElement = inject(ElementRef);
    r2 = inject(Renderer2);
    store = inject(Store);
    filterChatsControl = new FormControl('');
    chats = this.store.selectSignal(selectLastMessageChatMap);
    filterChatsControlValue = toSignal(this.filterChatsControl.valueChanges, { initialValue: this.filterChatsControl.value });
    filterChats = computed(() => {
        const inputValue = this.filterChatsControlValue();
        return this.chats()
            .filter((chat) => {
            return `${chat.userFrom.firstName} ${chat.userFrom.lastName}`
                .toLowerCase()
                .includes(inputValue.toLowerCase() ?? '');
        })
            .slice()
            .sort((a, b) => {
            return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
        });
    });
    ngOnInit() {
        this.store.dispatch(chatsActions.loadLastMessageChatMap());
    }
    ngAfterViewInit() {
        this.resizeFeed();
    }
    // 2 Метод c Декоратором
    onWindowResize() {
        this.resizeFeed();
    }
    resizeFeed() {
        const { top } = this.hostElement.nativeElement.getBoundingClientRect();
        const height = window.innerHeight - top - 48;
        this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
    }
};
__decorate([
    Debounce(20),
    HostListener('window: resize')
], ChatsListComponent.prototype, "onWindowResize", null);
ChatsListComponent = __decorate([
    Component({
        selector: 'app-chats-list',
        standalone: true,
        imports: [
            ReactiveFormsModule,
            SvgIconComponent,
            ChatsBtnComponent,
            RouterLinkActive,
            RouterLink,
        ],
        templateUrl: './chats-list.component.html',
        styleUrl: './chats-list.component.scss',
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
], ChatsListComponent);
export { ChatsListComponent };
//# sourceMappingURL=chats-list.component.js.map