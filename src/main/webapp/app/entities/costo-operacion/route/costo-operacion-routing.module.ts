import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CostoOperacionComponent } from '../list/costo-operacion.component';
import { CostoOperacionDetailComponent } from '../detail/costo-operacion-detail.component';
import { CostoOperacionUpdateComponent } from '../update/costo-operacion-update.component';
import { CostoOperacionRoutingResolveService } from './costo-operacion-routing-resolve.service';

const costoOperacionRoute: Routes = [
  {
    path: '',
    component: CostoOperacionComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CostoOperacionDetailComponent,
    resolve: {
      costoOperacion: CostoOperacionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CostoOperacionUpdateComponent,
    resolve: {
      costoOperacion: CostoOperacionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CostoOperacionUpdateComponent,
    resolve: {
      costoOperacion: CostoOperacionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(costoOperacionRoute)],
  exports: [RouterModule],
})
export class CostoOperacionRoutingModule {}
