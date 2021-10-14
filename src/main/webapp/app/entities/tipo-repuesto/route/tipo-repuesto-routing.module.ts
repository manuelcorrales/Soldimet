import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TipoRepuestoComponent } from '../list/tipo-repuesto.component';
import { TipoRepuestoDetailComponent } from '../detail/tipo-repuesto-detail.component';
import { TipoRepuestoUpdateComponent } from '../update/tipo-repuesto-update.component';
import { TipoRepuestoRoutingResolveService } from './tipo-repuesto-routing-resolve.service';

const tipoRepuestoRoute: Routes = [
  {
    path: '',
    component: TipoRepuestoComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TipoRepuestoDetailComponent,
    resolve: {
      tipoRepuesto: TipoRepuestoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TipoRepuestoUpdateComponent,
    resolve: {
      tipoRepuesto: TipoRepuestoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TipoRepuestoUpdateComponent,
    resolve: {
      tipoRepuesto: TipoRepuestoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(tipoRepuestoRoute)],
  exports: [RouterModule],
})
export class TipoRepuestoRoutingModule {}
