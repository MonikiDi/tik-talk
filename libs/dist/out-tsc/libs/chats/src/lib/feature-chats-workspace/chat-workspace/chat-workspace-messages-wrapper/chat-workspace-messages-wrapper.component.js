import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, computed, effect, ElementRef, HostListener, inject, input, Renderer2, signal, } from '@angular/core';
import { ChatWorkspaceMessagesComponent } from './chat-workspace-messages/chat-workspace-messages.component';
import { MessageInputComponent } from '../../../ui/message-input/message-input.component';
import { assertNonNullish, chatByDay, DateUtcPipe, Debounce, normalizationText, } from '@tt/shared';
import { DatePipe } from '@angular/common';
import { ChatsService } from '@tt/data-access';
import { RelativeDatePipe } from '../../../../../../shared/src/lib/utils/pipes/relative-date.pipe';
let ChatWorkspaceMessagesWrapperComponent = class ChatWorkspaceMessagesWrapperComponent {
    hostElement = inject(ElementRef);
    chatsService = inject(ChatsService);
    r2 = inject(Renderer2);
    chat = input.required();
    profileMe = input.required();
    filterDayMessages = computed(() => {
        return chatByDay(this.chat().messages);
    });
    parentData = signal('');
    constructor() {
        effect(() => {
            this.scrollToBottom();
        });
    }
    scrollToBottom() {
        if (this.hostElement) {
            this.hostElement.nativeElement.scrollTo({
                top: this.hostElement.nativeElement.scrollHeight,
                behavior: 'smooth',
            });
        }
    }
    ngAfterViewInit() {
        this.resizeFeed();
    }
    onWindowResize() {
        this.resizeFeed();
    }
    resizeFeed() {
        const { top } = this.hostElement.nativeElement.getBoundingClientRect();
        const height = window.innerHeight - top - 48;
        this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
    }
    async onSendMessage(messageText) {
        setTimeout(() => {
            this.scrollToBottom();
        }, 300);
        const result = normalizationText(messageText);
        assertNonNullish(result, '');
        if (this.parentData() === '' || result === '') {
            this.parentData.set('');
            return;
        }
        this.chatsService.wsAdapter.sendMessage(result, this.chat().id);
        this.parentData.set('');
    }
};
__decorate([
    Debounce(20),
    HostListener('window: resize')
], ChatWorkspaceMessagesWrapperComponent.prototype, "onWindowResize", null);
ChatWorkspaceMessagesWrapperComponent = __decorate([
    Component({
        selector: 'app-chat-workspace-messages-wrapper',
        standalone: true,
        imports: [
            ChatWorkspaceMessagesComponent,
            MessageInputComponent,
            DateUtcPipe,
            DatePipe,
            RelativeDatePipe
        ],
        templateUrl: './chat-workspace-messages-wrapper.component.html',
        styleUrl: './chat-workspace-messages-wrapper.component.scss',
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
], ChatWorkspaceMessagesWrapperComponent);
export { ChatWorkspaceMessagesWrapperComponent };
//# sourceMappingURL=chat-workspace-messages-wrapper.component.js.map