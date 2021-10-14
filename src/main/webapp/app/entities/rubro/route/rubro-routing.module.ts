import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { RubroComponent } from '../list/rubro.component';
import { RubroDetailComponent } from '../detail/rubro-detail.component';
import { RubroUpdateComponent } from '../update/rubro-update.component';
import { RubroRoutingResolveService } from './rubro-routing-resolve.service';

const rubroRoute: Routes = [
  {
    path: '',
    component: RubroComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RubroDetailComponent,
    resolve: {
      rubro: RubroRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RubroUpdateComponent,
    resolve: {
      rubro: RubroRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RubroUpdateComponent,
    resolve: {
      rubro: RubroRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(rubroRoute)],
  exports: [RouterModule],
})
export class RubroRoutingModule {}
