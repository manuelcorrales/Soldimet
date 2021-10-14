import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { MovimientoPresupuestoComponent } from '../list/movimiento-presupuesto.component';
import { MovimientoPresupuestoDetailComponent } from '../detail/movimiento-presupuesto-detail.component';
import { MovimientoPresupuestoUpdateComponent } from '../update/movimiento-presupuesto-update.component';
import { MovimientoPresupuestoRoutingResolveService } from './movimiento-presupuesto-routing-resolve.service';

const movimientoPresupuestoRoute: Routes = [
  {
    path: '',
    component: MovimientoPresupuestoComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MovimientoPresupuestoDetailComponent,
    resolve: {
      movimientoPresupuesto: MovimientoPresupuestoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MovimientoPresupuestoUpdateComponent,
    resolve: {
      movimientoPresupuesto: MovimientoPresupuestoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MovimientoPresupuestoUpdateComponent,
    resolve: {
      movimientoPresupuesto: MovimientoPresupuestoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(movimientoPresupuestoRoute)],
  exports: [RouterModule],
})
export class MovimientoPresupuestoRoutingModule {}
