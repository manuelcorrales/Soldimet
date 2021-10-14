import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EstadoArticuloComponent } from '../list/estado-articulo.component';
import { EstadoArticuloDetailComponent } from '../detail/estado-articulo-detail.component';
import { EstadoArticuloUpdateComponent } from '../update/estado-articulo-update.component';
import { EstadoArticuloRoutingResolveService } from './estado-articulo-routing-resolve.service';

const estadoArticuloRoute: Routes = [
  {
    path: '',
    component: EstadoArticuloComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EstadoArticuloDetailComponent,
    resolve: {
      estadoArticulo: EstadoArticuloRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EstadoArticuloUpdateComponent,
    resolve: {
      estadoArticulo: EstadoArticuloRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EstadoArticuloUpdateComponent,
    resolve: {
      estadoArticulo: EstadoArticuloRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(estadoArticuloRoute)],
  exports: [RouterModule],
})
export class EstadoArticuloRoutingModule {}
