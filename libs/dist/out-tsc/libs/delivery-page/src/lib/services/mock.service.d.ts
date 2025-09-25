import { Observable } from 'rxjs';
export interface Address {
    city?: string;
    street?: string;
    building?: number | null;
    apartment?: number | null;
}
export interface Feature {
    code: string;
    label: string;
    value: boolean;
}
export declare class MockService {
    getAddressData(): Observable<Address[]>;
    getFeatures(): Observable<Feature[]>;
}
//# sourceMappingURL=mock.service.d.ts.map