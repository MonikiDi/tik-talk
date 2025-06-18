import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {
  authTokenInterceptor,
  chatProviders,
  postProviders,
  profileProviders,
} from '@tt/data-access';

const effectProviders = [postProviders, profileProviders, chatProviders];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authTokenInterceptor])),
    provideStore(),
    provideEffects(),
    ...effectProviders,
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
