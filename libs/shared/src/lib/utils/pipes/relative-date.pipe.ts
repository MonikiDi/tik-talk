import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  standalone: true,
  name: 'relativeDate'
})
export class RelativeDatePipe implements PipeTransform {

  transform(value: Date | string): string | null {
    if (!value) {
      return null;
    }
    const date = new Date(value);
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    if (date.toDateString() === now.toDateString()) {
      return 'Сегодня';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Вчера';
    } else {
      const datePipe = new DatePipe('en-US');
      return datePipe.transform(date, 'dd.MM.YYYY') || ''.toString();
    }
  }
}
