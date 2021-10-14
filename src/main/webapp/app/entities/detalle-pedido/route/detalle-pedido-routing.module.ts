import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DetallePedidoComponent } from '../list/detalle-pedido.component';
import { DetallePedidoDetailComponent } from '../detail/detalle-pedido-detail.component';
import { DetallePedidoUpdateComponent } from '../update/detalle-pedido-update.component';
import { DetallePedidoRoutingResolveService } from './detalle-pedido-routing-resolve.service';

const detallePedidoRoute: Routes = [
  {
    path: '',
    component: DetallePedidoComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DetallePedidoDetailComponent,
    resolve: {
      detallePedido: DetallePedidoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DetallePedidoUpdateComponent,
    resolve: {
      detallePedido: DetallePedidoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DetallePedidoUpdateComponent,
    resolve: {
      detallePedido: DetallePedidoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(detallePedidoRoute)],
  exports: [RouterModule],
})
export class DetallePedidoRoutingModule {}
