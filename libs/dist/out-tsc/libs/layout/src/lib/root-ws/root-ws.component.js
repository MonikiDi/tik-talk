import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, DestroyRef, inject, } from '@angular/core';
import { ChatsService } from '@tt/data-access';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
let RootWsComponent = class RootWsComponent {
    chatService = inject(ChatsService);
    destroyRef = inject(DestroyRef);
    ngOnInit() {
        this.chatService
            .connectWs()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(console.log);
    }
};
RootWsComponent = __decorate([
    Component({
        selector: 'root-ws',
        standalone: true,
        imports: [RouterOutlet],
        templateUrl: './root-ws.component.html',
        styleUrl: './root-ws.component.scss',
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
], RootWsComponent);
export { RootWsComponent };
//# sourceMappingURL=root-ws.component.js.map