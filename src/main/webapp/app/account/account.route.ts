import { Routes } from '@angular/router';

import { activateRoute } from 'app/account/activate/activate.route';
import { passwordRoute } from 'app/account/password/password.route';
import { passwordResetFinishRoute } from 'app/account/password-reset/finish/password-reset-finish.route';
import { passwordResetInitRoute } from 'app/account/password-reset/init/password-reset-init.route';
import { registerRoute } from 'app/account/register/register.route';
import { settingsRoute } from 'app/account/settings/settings.route';

const ACCOUNT_ROUTES = [activateRoute, passwordRoute, passwordResetFinishRoute, passwordResetInitRoute, registerRoute, settingsRoute];

export const accountState: Routes = [
  {
    path: '',
    children: ACCOUNT_ROUTES
  }
];
