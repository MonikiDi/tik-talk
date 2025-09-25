import { Routes } from '@angular/router';
import { LoginPageComponent } from '@tt/auth';
import { ProfileMePageComponent, SearchPageComponent } from '@tt/profile';
import { ProfilePageComponent } from '@tt/profile';
import { SettingsPageComponent } from '@tt/profile';
import { chatsRoutes } from '@tt/chats';
import { LayoutComponent } from '@tt/layout';
import { canActivateAuth } from '@tt/data-access';
import { RootWsComponent } from '../../../../libs/layout/src/lib/root-ws/root-ws.component';
import { TestPageComponent } from '@tt/test-page';
import { DeliveryPageComponent } from '../../../../libs/delivery-page/src/lib/components';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: RootWsComponent,
        children: [
          { path: '', redirectTo: 'profile/me', pathMatch: 'full' },
          { path: 'profile/me', component: ProfileMePageComponent },
          { path: 'profile/:id', component: ProfilePageComponent },
          { path: 'settings', component: SettingsPageComponent },
          {
            path: 'search',
            component: SearchPageComponent,
          },
          {
            path: 'chats',
            loadChildren: () => chatsRoutes,
          },
          {
            path: 'delivery-page',
            component: DeliveryPageComponent,
          },
          {
            path: 'test-page',
            component: TestPageComponent,
          },
        ],
      },
    ],
    canActivate: [canActivateAuth],
  },
  { path: 'login', component: LoginPageComponent },
];
