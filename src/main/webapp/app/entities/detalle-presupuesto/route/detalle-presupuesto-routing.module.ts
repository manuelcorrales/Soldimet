import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DetallePresupuestoComponent } from '../list/detalle-presupuesto.component';
import { DetallePresupuestoDetailComponent } from '../detail/detalle-presupuesto-detail.component';
import { DetallePresupuestoUpdateComponent } from '../update/detalle-presupuesto-update.component';
import { DetallePresupuestoRoutingResolveService } from './detalle-presupuesto-routing-resolve.service';

const detallePresupuestoRoute: Routes = [
  {
    path: '',
    component: DetallePresupuestoComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DetallePresupuestoDetailComponent,
    resolve: {
      detallePresupuesto: DetallePresupuestoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DetallePresupuestoUpdateComponent,
    resolve: {
      detallePresupuesto: DetallePresupuestoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DetallePresupuestoUpdateComponent,
    resolve: {
      detallePresupuesto: DetallePresupuestoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(detallePresupuestoRoute)],
  exports: [RouterModule],
})
export class DetallePresupuestoRoutingModule {}
