import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EstadoCostoRepuestoComponent } from '../list/estado-costo-repuesto.component';
import { EstadoCostoRepuestoDetailComponent } from '../detail/estado-costo-repuesto-detail.component';
import { EstadoCostoRepuestoUpdateComponent } from '../update/estado-costo-repuesto-update.component';
import { EstadoCostoRepuestoRoutingResolveService } from './estado-costo-repuesto-routing-resolve.service';

const estadoCostoRepuestoRoute: Routes = [
  {
    path: '',
    component: EstadoCostoRepuestoComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EstadoCostoRepuestoDetailComponent,
    resolve: {
      estadoCostoRepuesto: EstadoCostoRepuestoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EstadoCostoRepuestoUpdateComponent,
    resolve: {
      estadoCostoRepuesto: EstadoCostoRepuestoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EstadoCostoRepuestoUpdateComponent,
    resolve: {
      estadoCostoRepuesto: EstadoCostoRepuestoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(estadoCostoRepuestoRoute)],
  exports: [RouterModule],
})
export class EstadoCostoRepuestoRoutingModule {}
