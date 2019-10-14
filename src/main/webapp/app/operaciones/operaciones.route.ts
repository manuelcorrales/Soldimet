import { Route } from '@angular/router';

import { OperacionesComponent } from 'app/operaciones/operaciones.component';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';

export const OPERACIONES_ROUTE: Route = {
  path: 'operaciones',
  component: OperacionesComponent,
  data: {
    authorities: ['ROLE_USER'],
    pageTitle: 'Operaciones'
  },
  canActivate: [UserRouteAccessService]
};
