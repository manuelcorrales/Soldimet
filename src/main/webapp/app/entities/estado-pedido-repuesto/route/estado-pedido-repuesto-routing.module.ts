import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EstadoPedidoRepuestoComponent } from '../list/estado-pedido-repuesto.component';
import { EstadoPedidoRepuestoDetailComponent } from '../detail/estado-pedido-repuesto-detail.component';
import { EstadoPedidoRepuestoUpdateComponent } from '../update/estado-pedido-repuesto-update.component';
import { EstadoPedidoRepuestoRoutingResolveService } from './estado-pedido-repuesto-routing-resolve.service';

const estadoPedidoRepuestoRoute: Routes = [
  {
    path: '',
    component: EstadoPedidoRepuestoComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EstadoPedidoRepuestoDetailComponent,
    resolve: {
      estadoPedidoRepuesto: EstadoPedidoRepuestoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EstadoPedidoRepuestoUpdateComponent,
    resolve: {
      estadoPedidoRepuesto: EstadoPedidoRepuestoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EstadoPedidoRepuestoUpdateComponent,
    resolve: {
      estadoPedidoRepuesto: EstadoPedidoRepuestoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(estadoPedidoRepuestoRoute)],
  exports: [RouterModule],
})
export class EstadoPedidoRepuestoRoutingModule {}
