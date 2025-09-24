import { EventEmitter } from '@angular/core';
export declare class DndDirective {
    fileDropped: EventEmitter<File>;
    fileover: boolean;
    onDragOver(event: DragEvent): void;
    onDragLeave(event: DragEvent): void;
    onDrop(event: DragEvent): void;
}
//# sourceMappingURL=dnd.directive.d.ts.map