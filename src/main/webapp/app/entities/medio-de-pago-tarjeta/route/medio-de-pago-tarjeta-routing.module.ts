import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { MedioDePagoTarjetaComponent } from '../list/medio-de-pago-tarjeta.component';
import { MedioDePagoTarjetaDetailComponent } from '../detail/medio-de-pago-tarjeta-detail.component';
import { MedioDePagoTarjetaUpdateComponent } from '../update/medio-de-pago-tarjeta-update.component';
import { MedioDePagoTarjetaRoutingResolveService } from './medio-de-pago-tarjeta-routing-resolve.service';

const medioDePagoTarjetaRoute: Routes = [
  {
    path: '',
    component: MedioDePagoTarjetaComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MedioDePagoTarjetaDetailComponent,
    resolve: {
      medioDePagoTarjeta: MedioDePagoTarjetaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MedioDePagoTarjetaUpdateComponent,
    resolve: {
      medioDePagoTarjeta: MedioDePagoTarjetaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MedioDePagoTarjetaUpdateComponent,
    resolve: {
      medioDePagoTarjeta: MedioDePagoTarjetaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(medioDePagoTarjetaRoute)],
  exports: [RouterModule],
})
export class MedioDePagoTarjetaRoutingModule {}
