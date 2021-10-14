import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AplicacionComponent } from '../list/aplicacion.component';
import { AplicacionDetailComponent } from '../detail/aplicacion-detail.component';
import { AplicacionUpdateComponent } from '../update/aplicacion-update.component';
import { AplicacionRoutingResolveService } from './aplicacion-routing-resolve.service';

const aplicacionRoute: Routes = [
  {
    path: '',
    component: AplicacionComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AplicacionDetailComponent,
    resolve: {
      aplicacion: AplicacionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AplicacionUpdateComponent,
    resolve: {
      aplicacion: AplicacionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AplicacionUpdateComponent,
    resolve: {
      aplicacion: AplicacionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(aplicacionRoute)],
  exports: [RouterModule],
})
export class AplicacionRoutingModule {}
