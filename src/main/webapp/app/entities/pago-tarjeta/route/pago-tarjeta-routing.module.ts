import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PagoTarjetaComponent } from '../list/pago-tarjeta.component';
import { PagoTarjetaDetailComponent } from '../detail/pago-tarjeta-detail.component';
import { PagoTarjetaUpdateComponent } from '../update/pago-tarjeta-update.component';
import { PagoTarjetaRoutingResolveService } from './pago-tarjeta-routing-resolve.service';

const pagoTarjetaRoute: Routes = [
  {
    path: '',
    component: PagoTarjetaComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PagoTarjetaDetailComponent,
    resolve: {
      pagoTarjeta: PagoTarjetaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PagoTarjetaUpdateComponent,
    resolve: {
      pagoTarjeta: PagoTarjetaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PagoTarjetaUpdateComponent,
    resolve: {
      pagoTarjeta: PagoTarjetaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(pagoTarjetaRoute)],
  exports: [RouterModule],
})
export class PagoTarjetaRoutingModule {}
