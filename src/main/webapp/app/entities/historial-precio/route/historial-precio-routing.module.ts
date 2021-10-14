import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { HistorialPrecioComponent } from '../list/historial-precio.component';
import { HistorialPrecioDetailComponent } from '../detail/historial-precio-detail.component';
import { HistorialPrecioUpdateComponent } from '../update/historial-precio-update.component';
import { HistorialPrecioRoutingResolveService } from './historial-precio-routing-resolve.service';

const historialPrecioRoute: Routes = [
  {
    path: '',
    component: HistorialPrecioComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: HistorialPrecioDetailComponent,
    resolve: {
      historialPrecio: HistorialPrecioRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: HistorialPrecioUpdateComponent,
    resolve: {
      historialPrecio: HistorialPrecioRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: HistorialPrecioUpdateComponent,
    resolve: {
      historialPrecio: HistorialPrecioRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(historialPrecioRoute)],
  exports: [RouterModule],
})
export class HistorialPrecioRoutingModule {}
