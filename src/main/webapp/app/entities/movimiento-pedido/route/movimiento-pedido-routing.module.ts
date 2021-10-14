import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { MovimientoPedidoComponent } from '../list/movimiento-pedido.component';
import { MovimientoPedidoDetailComponent } from '../detail/movimiento-pedido-detail.component';
import { MovimientoPedidoUpdateComponent } from '../update/movimiento-pedido-update.component';
import { MovimientoPedidoRoutingResolveService } from './movimiento-pedido-routing-resolve.service';

const movimientoPedidoRoute: Routes = [
  {
    path: '',
    component: MovimientoPedidoComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MovimientoPedidoDetailComponent,
    resolve: {
      movimientoPedido: MovimientoPedidoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MovimientoPedidoUpdateComponent,
    resolve: {
      movimientoPedido: MovimientoPedidoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MovimientoPedidoUpdateComponent,
    resolve: {
      movimientoPedido: MovimientoPedidoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(movimientoPedidoRoute)],
  exports: [RouterModule],
})
export class MovimientoPedidoRoutingModule {}
