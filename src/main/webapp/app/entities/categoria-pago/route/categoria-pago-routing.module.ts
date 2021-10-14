import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CategoriaPagoComponent } from '../list/categoria-pago.component';
import { CategoriaPagoDetailComponent } from '../detail/categoria-pago-detail.component';
import { CategoriaPagoUpdateComponent } from '../update/categoria-pago-update.component';
import { CategoriaPagoRoutingResolveService } from './categoria-pago-routing-resolve.service';

const categoriaPagoRoute: Routes = [
  {
    path: '',
    component: CategoriaPagoComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CategoriaPagoDetailComponent,
    resolve: {
      categoriaPago: CategoriaPagoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CategoriaPagoUpdateComponent,
    resolve: {
      categoriaPago: CategoriaPagoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CategoriaPagoUpdateComponent,
    resolve: {
      categoriaPago: CategoriaPagoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(categoriaPagoRoute)],
  exports: [RouterModule],
})
export class CategoriaPagoRoutingModule {}
