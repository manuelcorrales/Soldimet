import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { SettingsComponent } from 'app/account/settings/settings.component';

export const settingsRoute: Route = {
  path: 'settings',
  component: SettingsComponent,
  data: {
    authorities: ['ROLE_USER'],
    pageTitle: 'Settings'
  },
  canActivate: [UserRouteAccessService]
};
