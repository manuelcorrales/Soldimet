import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EstadoCobranzaOperacionComponent } from '../list/estado-cobranza-operacion.component';
import { EstadoCobranzaOperacionDetailComponent } from '../detail/estado-cobranza-operacion-detail.component';
import { EstadoCobranzaOperacionUpdateComponent } from '../update/estado-cobranza-operacion-update.component';
import { EstadoCobranzaOperacionRoutingResolveService } from './estado-cobranza-operacion-routing-resolve.service';

const estadoCobranzaOperacionRoute: Routes = [
  {
    path: '',
    component: EstadoCobranzaOperacionComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EstadoCobranzaOperacionDetailComponent,
    resolve: {
      estadoCobranzaOperacion: EstadoCobranzaOperacionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EstadoCobranzaOperacionUpdateComponent,
    resolve: {
      estadoCobranzaOperacion: EstadoCobranzaOperacionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EstadoCobranzaOperacionUpdateComponent,
    resolve: {
      estadoCobranzaOperacion: EstadoCobranzaOperacionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(estadoCobranzaOperacionRoute)],
  exports: [RouterModule],
})
export class EstadoCobranzaOperacionRoutingModule {}
