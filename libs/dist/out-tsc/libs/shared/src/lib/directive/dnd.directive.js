import { __decorate } from "tslib";
import { Directive, EventEmitter, HostBinding, HostListener, Output, } from '@angular/core';
let DndDirective = class DndDirective {
    fileDropped = new EventEmitter();
    fileover = false;
    onDragOver(event) {
        event.preventDefault();
        event.stopPropagation();
        this.fileover = true;
    }
    onDragLeave(event) {
        event.preventDefault();
        event.stopPropagation();
        this.fileover = false;
    }
    onDrop(event) {
        event.preventDefault();
        event.stopPropagation();
        this.fileover = false;
        this.fileDropped.emit(event.dataTransfer?.files[0]);
    }
};
__decorate([
    Output()
], DndDirective.prototype, "fileDropped", void 0);
__decorate([
    HostBinding('class.fileover')
], DndDirective.prototype, "fileover", void 0);
__decorate([
    HostListener('dragover', ['$event'])
], DndDirective.prototype, "onDragOver", null);
__decorate([
    HostListener('dragleave', ['$event'])
], DndDirective.prototype, "onDragLeave", null);
__decorate([
    HostListener('drop', ['$event'])
], DndDirective.prototype, "onDrop", null);
DndDirective = __decorate([
    Directive({
        selector: '[dnd]',
        standalone: true,
    })
], DndDirective);
export { DndDirective };
//# sourceMappingURL=dnd.directive.js.map