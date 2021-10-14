import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { MovimientoArticuloComponent } from '../list/movimiento-articulo.component';
import { MovimientoArticuloDetailComponent } from '../detail/movimiento-articulo-detail.component';
import { MovimientoArticuloUpdateComponent } from '../update/movimiento-articulo-update.component';
import { MovimientoArticuloRoutingResolveService } from './movimiento-articulo-routing-resolve.service';

const movimientoArticuloRoute: Routes = [
  {
    path: '',
    component: MovimientoArticuloComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MovimientoArticuloDetailComponent,
    resolve: {
      movimientoArticulo: MovimientoArticuloRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MovimientoArticuloUpdateComponent,
    resolve: {
      movimientoArticulo: MovimientoArticuloRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MovimientoArticuloUpdateComponent,
    resolve: {
      movimientoArticulo: MovimientoArticuloRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(movimientoArticuloRoute)],
  exports: [RouterModule],
})
export class MovimientoArticuloRoutingModule {}
