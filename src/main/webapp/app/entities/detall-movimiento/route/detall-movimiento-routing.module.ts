import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DetallMovimientoComponent } from '../list/detall-movimiento.component';
import { DetallMovimientoDetailComponent } from '../detail/detall-movimiento-detail.component';
import { DetallMovimientoUpdateComponent } from '../update/detall-movimiento-update.component';
import { DetallMovimientoRoutingResolveService } from './detall-movimiento-routing-resolve.service';

const detallMovimientoRoute: Routes = [
  {
    path: '',
    component: DetallMovimientoComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DetallMovimientoDetailComponent,
    resolve: {
      detallMovimiento: DetallMovimientoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DetallMovimientoUpdateComponent,
    resolve: {
      detallMovimiento: DetallMovimientoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DetallMovimientoUpdateComponent,
    resolve: {
      detallMovimiento: DetallMovimientoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(detallMovimientoRoute)],
  exports: [RouterModule],
})
export class DetallMovimientoRoutingModule {}
