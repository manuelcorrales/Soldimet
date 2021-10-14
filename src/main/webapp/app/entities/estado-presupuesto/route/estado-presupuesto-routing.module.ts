import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EstadoPresupuestoComponent } from '../list/estado-presupuesto.component';
import { EstadoPresupuestoDetailComponent } from '../detail/estado-presupuesto-detail.component';
import { EstadoPresupuestoUpdateComponent } from '../update/estado-presupuesto-update.component';
import { EstadoPresupuestoRoutingResolveService } from './estado-presupuesto-routing-resolve.service';

const estadoPresupuestoRoute: Routes = [
  {
    path: '',
    component: EstadoPresupuestoComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EstadoPresupuestoDetailComponent,
    resolve: {
      estadoPresupuesto: EstadoPresupuestoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EstadoPresupuestoUpdateComponent,
    resolve: {
      estadoPresupuesto: EstadoPresupuestoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EstadoPresupuestoUpdateComponent,
    resolve: {
      estadoPresupuesto: EstadoPresupuestoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(estadoPresupuestoRoute)],
  exports: [RouterModule],
})
export class EstadoPresupuestoRoutingModule {}
