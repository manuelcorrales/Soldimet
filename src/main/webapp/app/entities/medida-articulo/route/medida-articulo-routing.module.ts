import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { MedidaArticuloComponent } from '../list/medida-articulo.component';
import { MedidaArticuloDetailComponent } from '../detail/medida-articulo-detail.component';
import { MedidaArticuloUpdateComponent } from '../update/medida-articulo-update.component';
import { MedidaArticuloRoutingResolveService } from './medida-articulo-routing-resolve.service';

const medidaArticuloRoute: Routes = [
  {
    path: '',
    component: MedidaArticuloComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MedidaArticuloDetailComponent,
    resolve: {
      medidaArticulo: MedidaArticuloRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MedidaArticuloUpdateComponent,
    resolve: {
      medidaArticulo: MedidaArticuloRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MedidaArticuloUpdateComponent,
    resolve: {
      medidaArticulo: MedidaArticuloRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(medidaArticuloRoute)],
  exports: [RouterModule],
})
export class MedidaArticuloRoutingModule {}
