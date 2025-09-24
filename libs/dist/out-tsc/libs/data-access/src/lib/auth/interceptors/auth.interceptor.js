import { inject } from '@angular/core';
import { BehaviorSubject, catchError, filter, switchMap, tap, throwError, } from 'rxjs';
import { AuthService } from '../services/auth.service';
let isRefreshing$ = new BehaviorSubject(false);
export const authTokenInterceptor = (req, next) => {
    const authService = inject(AuthService);
    const token = authService.token;
    if (!token)
        return next(req);
    if (isRefreshing$.value) {
        return refreshProceed(authService, req, next);
    }
    return next(addToken(req, token)).pipe(catchError((error) => {
        if (error.status === 403) {
            return refreshProceed(authService, req, next);
        }
        return throwError(error);
    }));
};
const refreshProceed = (authService, req, next) => {
    if (!isRefreshing$.value) {
        isRefreshing$.next(true);
        return authService.refreshAuthToken().pipe(switchMap((res) => {
            return next(addToken(req, res.access_token)).pipe(tap(() => isRefreshing$.next(false)));
        }));
    }
    if (req.url.includes('refresh'))
        return next(addToken(req, authService.token));
    return isRefreshing$.pipe(filter((isRefreshing) => !isRefreshing), switchMap((res) => {
        return next(addToken(req, authService.token));
    }));
};
const addToken = (req, token) => {
    return req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`,
        },
    });
};
//# sourceMappingURL=auth.interceptor.js.map