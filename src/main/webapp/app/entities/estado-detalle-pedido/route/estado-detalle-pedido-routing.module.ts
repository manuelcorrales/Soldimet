import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EstadoDetallePedidoComponent } from '../list/estado-detalle-pedido.component';
import { EstadoDetallePedidoDetailComponent } from '../detail/estado-detalle-pedido-detail.component';
import { EstadoDetallePedidoUpdateComponent } from '../update/estado-detalle-pedido-update.component';
import { EstadoDetallePedidoRoutingResolveService } from './estado-detalle-pedido-routing-resolve.service';

const estadoDetallePedidoRoute: Routes = [
  {
    path: '',
    component: EstadoDetallePedidoComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EstadoDetallePedidoDetailComponent,
    resolve: {
      estadoDetallePedido: EstadoDetallePedidoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EstadoDetallePedidoUpdateComponent,
    resolve: {
      estadoDetallePedido: EstadoDetallePedidoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EstadoDetallePedidoUpdateComponent,
    resolve: {
      estadoDetallePedido: EstadoDetallePedidoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(estadoDetallePedidoRoute)],
  exports: [RouterModule],
})
export class EstadoDetallePedidoRoutingModule {}
