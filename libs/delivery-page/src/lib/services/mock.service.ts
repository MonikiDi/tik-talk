import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


export interface Address {
  city?: string,
  street?: string,
  building?: number | null,
  apartment?: number | null,
}

export interface Feature {
  code: string,
  label: string,
  value: boolean
}

const MOCK_DATA1 = [
  { 'city': 'Москва', 'street': 'Ленина', 'building': 115, 'apartment': 1 },
  { 'city': 'Санкт-Петербург', 'street': 'Заставская', 'building': 15, 'apartment': 51 }
];

const MOCK_DATA2 = [
  {
    code: 'lift',
    label: 'Подъем на этаж',
    value: false
  },
  {
    code: 'strong-package',
    label: 'Усиленная упаковка',
    value: true
  },
  {
    code: 'fast',
    label: 'Ускоренная доставка',
    value: true
  }
];


@Injectable({
  providedIn: 'root'
})
export class MockService {
  getAddressData(): Observable<Address[]> {
    return of(MOCK_DATA1);
  }

  getFeatures(): Observable<Feature[]> {
    return of(MOCK_DATA2);
  }
}
