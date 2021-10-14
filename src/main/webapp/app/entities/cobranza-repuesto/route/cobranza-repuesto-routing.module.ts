import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CobranzaRepuestoComponent } from '../list/cobranza-repuesto.component';
import { CobranzaRepuestoDetailComponent } from '../detail/cobranza-repuesto-detail.component';
import { CobranzaRepuestoUpdateComponent } from '../update/cobranza-repuesto-update.component';
import { CobranzaRepuestoRoutingResolveService } from './cobranza-repuesto-routing-resolve.service';

const cobranzaRepuestoRoute: Routes = [
  {
    path: '',
    component: CobranzaRepuestoComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CobranzaRepuestoDetailComponent,
    resolve: {
      cobranzaRepuesto: CobranzaRepuestoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CobranzaRepuestoUpdateComponent,
    resolve: {
      cobranzaRepuesto: CobranzaRepuestoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CobranzaRepuestoUpdateComponent,
    resolve: {
      cobranzaRepuesto: CobranzaRepuestoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cobranzaRepuestoRoute)],
  exports: [RouterModule],
})
export class CobranzaRepuestoRoutingModule {}
