import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { TokenResponse } from '@tt/interfaces/auth';
export declare class AuthService {
    http: HttpClient;
    router: Router;
    cookieService: CookieService;
    baseApiUrl: string;
    token: string | null;
    refreshToken: string | null;
    get isAuth(): boolean;
    login(payload: {
        username: string;
        password: string;
    }): import("rxjs").Observable<TokenResponse>;
    refreshAuthToken(): import("rxjs").Observable<TokenResponse>;
    logout(): void;
    saveTokens(res: TokenResponse): void;
}
//# sourceMappingURL=auth.service.d.ts.map