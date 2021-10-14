import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PedidoRepuestoComponent } from '../list/pedido-repuesto.component';
import { PedidoRepuestoDetailComponent } from '../detail/pedido-repuesto-detail.component';
import { PedidoRepuestoUpdateComponent } from '../update/pedido-repuesto-update.component';
import { PedidoRepuestoRoutingResolveService } from './pedido-repuesto-routing-resolve.service';

const pedidoRepuestoRoute: Routes = [
  {
    path: '',
    component: PedidoRepuestoComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PedidoRepuestoDetailComponent,
    resolve: {
      pedidoRepuesto: PedidoRepuestoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PedidoRepuestoUpdateComponent,
    resolve: {
      pedidoRepuesto: PedidoRepuestoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PedidoRepuestoUpdateComponent,
    resolve: {
      pedidoRepuesto: PedidoRepuestoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(pedidoRepuestoRoute)],
  exports: [RouterModule],
})
export class PedidoRepuestoRoutingModule {}
