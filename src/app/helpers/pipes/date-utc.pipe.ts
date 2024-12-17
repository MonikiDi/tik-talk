import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateUtc',
  standalone: true,
})
export class DateUtcPipe implements PipeTransform {
  transform(date: string): string {
    const nowDateUtcParse = Date.parse(date.toString());
    const iso = new Date().getTimezoneOffset()
    const nowUtcDate = new Date(nowDateUtcParse + (-iso * 60 * 1000))
    return nowUtcDate.toString();
  }
}
