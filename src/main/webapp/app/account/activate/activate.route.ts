import { Route } from '@angular/router';

import { ActivateComponent } from 'app/account/activate/activate.component';

export const activateRoute: Route = {
  path: 'activate',
  component: ActivateComponent,
  data: {
    authorities: [],
    pageTitle: 'Activation'
  }
};
