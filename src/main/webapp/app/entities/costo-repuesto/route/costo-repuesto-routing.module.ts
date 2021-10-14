import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CostoRepuestoComponent } from '../list/costo-repuesto.component';
import { CostoRepuestoDetailComponent } from '../detail/costo-repuesto-detail.component';
import { CostoRepuestoUpdateComponent } from '../update/costo-repuesto-update.component';
import { CostoRepuestoRoutingResolveService } from './costo-repuesto-routing-resolve.service';

const costoRepuestoRoute: Routes = [
  {
    path: '',
    component: CostoRepuestoComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CostoRepuestoDetailComponent,
    resolve: {
      costoRepuesto: CostoRepuestoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CostoRepuestoUpdateComponent,
    resolve: {
      costoRepuesto: CostoRepuestoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CostoRepuestoUpdateComponent,
    resolve: {
      costoRepuesto: CostoRepuestoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(costoRepuestoRoute)],
  exports: [RouterModule],
})
export class CostoRepuestoRoutingModule {}
