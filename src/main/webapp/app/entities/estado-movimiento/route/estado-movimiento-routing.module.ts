import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EstadoMovimientoComponent } from '../list/estado-movimiento.component';
import { EstadoMovimientoDetailComponent } from '../detail/estado-movimiento-detail.component';
import { EstadoMovimientoUpdateComponent } from '../update/estado-movimiento-update.component';
import { EstadoMovimientoRoutingResolveService } from './estado-movimiento-routing-resolve.service';

const estadoMovimientoRoute: Routes = [
  {
    path: '',
    component: EstadoMovimientoComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EstadoMovimientoDetailComponent,
    resolve: {
      estadoMovimiento: EstadoMovimientoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EstadoMovimientoUpdateComponent,
    resolve: {
      estadoMovimiento: EstadoMovimientoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EstadoMovimientoUpdateComponent,
    resolve: {
      estadoMovimiento: EstadoMovimientoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(estadoMovimientoRoute)],
  exports: [RouterModule],
})
export class EstadoMovimientoRoutingModule {}
