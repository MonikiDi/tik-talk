import { PipeTransform } from '@angular/core';
import { KeyTimeWorld, TimeWorld } from '../../data/interfaces/time-word.interface';
export declare class DataCreateAtPipe implements PipeTransform {
    timeWorld: TimeWorld;
    endingsTimeWords(number: number, type: KeyTimeWorld): string;
    transform(date: string | null): string | null;
}
//# sourceMappingURL=data-create-at.pipe.d.ts.map