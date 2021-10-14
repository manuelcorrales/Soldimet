import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { BancoComponent } from '../list/banco.component';
import { BancoDetailComponent } from '../detail/banco-detail.component';
import { BancoUpdateComponent } from '../update/banco-update.component';
import { BancoRoutingResolveService } from './banco-routing-resolve.service';

const bancoRoute: Routes = [
  {
    path: '',
    component: BancoComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: BancoDetailComponent,
    resolve: {
      banco: BancoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: BancoUpdateComponent,
    resolve: {
      banco: BancoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: BancoUpdateComponent,
    resolve: {
      banco: BancoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(bancoRoute)],
  exports: [RouterModule],
})
export class BancoRoutingModule {}
