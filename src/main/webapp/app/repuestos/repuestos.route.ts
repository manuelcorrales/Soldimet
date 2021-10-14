import { Route } from '@angular/router';
import { RepuestosComponent } from 'app/repuestos/repuestos.component';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';

export const REPUESTOS_ROUTE: Route = {
  path: 'repuestos',
  component: RepuestosComponent,
  data: {
    authorities: ['ROLE_USER'],
    pageTitle: 'Repuestos',
  },
  canActivate: [UserRouteAccessService],
};
