import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TipoDetalleMovimientoComponent } from '../list/tipo-detalle-movimiento.component';
import { TipoDetalleMovimientoDetailComponent } from '../detail/tipo-detalle-movimiento-detail.component';
import { TipoDetalleMovimientoUpdateComponent } from '../update/tipo-detalle-movimiento-update.component';
import { TipoDetalleMovimientoRoutingResolveService } from './tipo-detalle-movimiento-routing-resolve.service';

const tipoDetalleMovimientoRoute: Routes = [
  {
    path: '',
    component: TipoDetalleMovimientoComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TipoDetalleMovimientoDetailComponent,
    resolve: {
      tipoDetalleMovimiento: TipoDetalleMovimientoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TipoDetalleMovimientoUpdateComponent,
    resolve: {
      tipoDetalleMovimiento: TipoDetalleMovimientoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TipoDetalleMovimientoUpdateComponent,
    resolve: {
      tipoDetalleMovimiento: TipoDetalleMovimientoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(tipoDetalleMovimientoRoute)],
  exports: [RouterModule],
})
export class TipoDetalleMovimientoRoutingModule {}
