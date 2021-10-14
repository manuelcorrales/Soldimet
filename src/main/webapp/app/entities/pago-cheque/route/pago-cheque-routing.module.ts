import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PagoChequeComponent } from '../list/pago-cheque.component';
import { PagoChequeDetailComponent } from '../detail/pago-cheque-detail.component';
import { PagoChequeUpdateComponent } from '../update/pago-cheque-update.component';
import { PagoChequeRoutingResolveService } from './pago-cheque-routing-resolve.service';

const pagoChequeRoute: Routes = [
  {
    path: '',
    component: PagoChequeComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PagoChequeDetailComponent,
    resolve: {
      pagoCheque: PagoChequeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PagoChequeUpdateComponent,
    resolve: {
      pagoCheque: PagoChequeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PagoChequeUpdateComponent,
    resolve: {
      pagoCheque: PagoChequeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(pagoChequeRoute)],
  exports: [RouterModule],
})
export class PagoChequeRoutingModule {}
