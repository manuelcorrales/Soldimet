import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { MedioDePagoComponent } from '../list/medio-de-pago.component';
import { MedioDePagoDetailComponent } from '../detail/medio-de-pago-detail.component';
import { MedioDePagoUpdateComponent } from '../update/medio-de-pago-update.component';
import { MedioDePagoRoutingResolveService } from './medio-de-pago-routing-resolve.service';

const medioDePagoRoute: Routes = [
  {
    path: '',
    component: MedioDePagoComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MedioDePagoDetailComponent,
    resolve: {
      medioDePago: MedioDePagoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MedioDePagoUpdateComponent,
    resolve: {
      medioDePago: MedioDePagoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MedioDePagoUpdateComponent,
    resolve: {
      medioDePago: MedioDePagoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(medioDePagoRoute)],
  exports: [RouterModule],
})
export class MedioDePagoRoutingModule {}
