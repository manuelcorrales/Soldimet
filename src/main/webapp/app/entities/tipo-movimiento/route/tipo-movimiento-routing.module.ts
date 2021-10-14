import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TipoMovimientoComponent } from '../list/tipo-movimiento.component';
import { TipoMovimientoDetailComponent } from '../detail/tipo-movimiento-detail.component';
import { TipoMovimientoUpdateComponent } from '../update/tipo-movimiento-update.component';
import { TipoMovimientoRoutingResolveService } from './tipo-movimiento-routing-resolve.service';

const tipoMovimientoRoute: Routes = [
  {
    path: '',
    component: TipoMovimientoComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TipoMovimientoDetailComponent,
    resolve: {
      tipoMovimiento: TipoMovimientoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TipoMovimientoUpdateComponent,
    resolve: {
      tipoMovimiento: TipoMovimientoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TipoMovimientoUpdateComponent,
    resolve: {
      tipoMovimiento: TipoMovimientoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(tipoMovimientoRoute)],
  exports: [RouterModule],
})
export class TipoMovimientoRoutingModule {}
