import {Pipe, PipeTransform} from '@angular/core';
import {KeyTimeWorld, TimeWorld} from '../../data/interfaces/time-word.interface';

@Pipe({
  name: 'dataCreateAt',
  standalone: true,
})

export class DataCreateAtPipe implements PipeTransform {


  timeWorld:TimeWorld  = {
    s: ['секунда', 'секунды', 'секунд'],
    m: ['минута', 'минуты', 'минут'],
    h: ['час', 'часа', 'часов'],
    d: ['день', 'дня', 'дней'],
  };


  endingsTimeWords(number: number, type:KeyTimeWorld): string {

    let result:string ='';
    switch ( (number >= 20) ? number % 10 : number )
    {
      case 1:
        result = this.timeWorld[type][0]
        break;
      case 2:
      case 3:
      case 4:
        result = this.timeWorld[type][1];
        break;
      default:
        result = this.timeWorld[type][2];
    }
    return result;
  }



  transform(date: string | null): string | null {
    if (!date) return null;

    const createAtDate = Date.parse(date);
    const iso = new Date().getTimezoneOffset()
    const createAtIsoDate = new Date(createAtDate + (iso * 60 * -1000))
    const nowDate = new Date()


    let hour = createAtIsoDate.getHours()
    let minutes = createAtIsoDate.getMinutes()
    let dayOfMonth = createAtIsoDate.getDate()
    let month = createAtIsoDate.getMonth()
    let year = createAtIsoDate.getFullYear()


    let diffMs = nowDate.getTime() - createAtIsoDate.getTime()
    let diffSec = Math.round(diffMs / 1000);
    let diffMin = Math.round(diffSec / 60);
    let diffHour = Math.round(diffMin / 60);
    let diffDayOfMonth = Math.round(diffHour / 24);


    if (diffSec < 1) {
      return 'прямо сейчас';
    } else if (diffMin < 1) {
      return `${diffSec} ${this.endingsTimeWords(diffSec,'s')}  назад`
    } else if (diffHour < 1) {
      return `${diffMin} ${this.endingsTimeWords(diffMin,'m')}  назад `
    } else if (diffHour < 24) {
      return `${diffHour} ${this.endingsTimeWords(diffHour,'h')}  назад`
    } else if (diffDayOfMonth < 32) {
      return `${diffDayOfMonth} ${this.endingsTimeWords(diffDayOfMonth,'d')} назад`
    } else {
      return `${dayOfMonth}.${month}.${year} ${hour}:${minutes}`
    }
  }
}
