import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PagoEfectivoComponent } from '../list/pago-efectivo.component';
import { PagoEfectivoDetailComponent } from '../detail/pago-efectivo-detail.component';
import { PagoEfectivoUpdateComponent } from '../update/pago-efectivo-update.component';
import { PagoEfectivoRoutingResolveService } from './pago-efectivo-routing-resolve.service';

const pagoEfectivoRoute: Routes = [
  {
    path: '',
    component: PagoEfectivoComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PagoEfectivoDetailComponent,
    resolve: {
      pagoEfectivo: PagoEfectivoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PagoEfectivoUpdateComponent,
    resolve: {
      pagoEfectivo: PagoEfectivoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PagoEfectivoUpdateComponent,
    resolve: {
      pagoEfectivo: PagoEfectivoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(pagoEfectivoRoute)],
  exports: [RouterModule],
})
export class PagoEfectivoRoutingModule {}
