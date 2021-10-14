import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PrecioRepuestoComponent } from '../list/precio-repuesto.component';
import { PrecioRepuestoDetailComponent } from '../detail/precio-repuesto-detail.component';
import { PrecioRepuestoUpdateComponent } from '../update/precio-repuesto-update.component';
import { PrecioRepuestoRoutingResolveService } from './precio-repuesto-routing-resolve.service';

const precioRepuestoRoute: Routes = [
  {
    path: '',
    component: PrecioRepuestoComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PrecioRepuestoDetailComponent,
    resolve: {
      precioRepuesto: PrecioRepuestoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PrecioRepuestoUpdateComponent,
    resolve: {
      precioRepuesto: PrecioRepuestoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PrecioRepuestoUpdateComponent,
    resolve: {
      precioRepuesto: PrecioRepuestoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(precioRepuestoRoute)],
  exports: [RouterModule],
})
export class PrecioRepuestoRoutingModule {}
