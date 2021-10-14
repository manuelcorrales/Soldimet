import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { MedioDePagoChequeComponent } from '../list/medio-de-pago-cheque.component';
import { MedioDePagoChequeDetailComponent } from '../detail/medio-de-pago-cheque-detail.component';
import { MedioDePagoChequeUpdateComponent } from '../update/medio-de-pago-cheque-update.component';
import { MedioDePagoChequeRoutingResolveService } from './medio-de-pago-cheque-routing-resolve.service';

const medioDePagoChequeRoute: Routes = [
  {
    path: '',
    component: MedioDePagoChequeComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MedioDePagoChequeDetailComponent,
    resolve: {
      medioDePagoCheque: MedioDePagoChequeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MedioDePagoChequeUpdateComponent,
    resolve: {
      medioDePagoCheque: MedioDePagoChequeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MedioDePagoChequeUpdateComponent,
    resolve: {
      medioDePagoCheque: MedioDePagoChequeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(medioDePagoChequeRoute)],
  exports: [RouterModule],
})
export class MedioDePagoChequeRoutingModule {}
