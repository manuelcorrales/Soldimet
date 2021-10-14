import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DetalleMovimientoComponent } from '../list/detalle-movimiento.component';
import { DetalleMovimientoDetailComponent } from '../detail/detalle-movimiento-detail.component';
import { DetalleMovimientoUpdateComponent } from '../update/detalle-movimiento-update.component';
import { DetalleMovimientoRoutingResolveService } from './detalle-movimiento-routing-resolve.service';

const detalleMovimientoRoute: Routes = [
  {
    path: '',
    component: DetalleMovimientoComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DetalleMovimientoDetailComponent,
    resolve: {
      detalleMovimiento: DetalleMovimientoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DetalleMovimientoUpdateComponent,
    resolve: {
      detalleMovimiento: DetalleMovimientoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DetalleMovimientoUpdateComponent,
    resolve: {
      detalleMovimiento: DetalleMovimientoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(detalleMovimientoRoute)],
  exports: [RouterModule],
})
export class DetalleMovimientoRoutingModule {}
