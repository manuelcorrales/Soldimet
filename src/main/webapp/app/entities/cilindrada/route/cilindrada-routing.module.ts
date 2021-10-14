import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CilindradaComponent } from '../list/cilindrada.component';
import { CilindradaDetailComponent } from '../detail/cilindrada-detail.component';
import { CilindradaUpdateComponent } from '../update/cilindrada-update.component';
import { CilindradaRoutingResolveService } from './cilindrada-routing-resolve.service';

const cilindradaRoute: Routes = [
  {
    path: '',
    component: CilindradaComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CilindradaDetailComponent,
    resolve: {
      cilindrada: CilindradaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CilindradaUpdateComponent,
    resolve: {
      cilindrada: CilindradaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CilindradaUpdateComponent,
    resolve: {
      cilindrada: CilindradaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cilindradaRoute)],
  exports: [RouterModule],
})
export class CilindradaRoutingModule {}
