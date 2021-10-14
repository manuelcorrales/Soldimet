import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EstadoOperacionComponent } from '../list/estado-operacion.component';
import { EstadoOperacionDetailComponent } from '../detail/estado-operacion-detail.component';
import { EstadoOperacionUpdateComponent } from '../update/estado-operacion-update.component';
import { EstadoOperacionRoutingResolveService } from './estado-operacion-routing-resolve.service';

const estadoOperacionRoute: Routes = [
  {
    path: '',
    component: EstadoOperacionComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EstadoOperacionDetailComponent,
    resolve: {
      estadoOperacion: EstadoOperacionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EstadoOperacionUpdateComponent,
    resolve: {
      estadoOperacion: EstadoOperacionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EstadoOperacionUpdateComponent,
    resolve: {
      estadoOperacion: EstadoOperacionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(estadoOperacionRoute)],
  exports: [RouterModule],
})
export class EstadoOperacionRoutingModule {}
