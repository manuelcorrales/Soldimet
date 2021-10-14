import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PresupuestoComponent } from '../list/presupuesto.component';
import { PresupuestoDetailComponent } from '../detail/presupuesto-detail.component';
import { PresupuestoUpdateComponent } from '../update/presupuesto-update.component';
import { PresupuestoRoutingResolveService } from './presupuesto-routing-resolve.service';

const presupuestoRoute: Routes = [
  {
    path: '',
    component: PresupuestoComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PresupuestoDetailComponent,
    resolve: {
      presupuesto: PresupuestoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PresupuestoUpdateComponent,
    resolve: {
      presupuesto: PresupuestoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PresupuestoUpdateComponent,
    resolve: {
      presupuesto: PresupuestoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(presupuestoRoute)],
  exports: [RouterModule],
})
export class PresupuestoRoutingModule {}
