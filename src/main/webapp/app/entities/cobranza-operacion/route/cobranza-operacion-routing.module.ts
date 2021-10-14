import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CobranzaOperacionComponent } from '../list/cobranza-operacion.component';
import { CobranzaOperacionDetailComponent } from '../detail/cobranza-operacion-detail.component';
import { CobranzaOperacionUpdateComponent } from '../update/cobranza-operacion-update.component';
import { CobranzaOperacionRoutingResolveService } from './cobranza-operacion-routing-resolve.service';

const cobranzaOperacionRoute: Routes = [
  {
    path: '',
    component: CobranzaOperacionComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CobranzaOperacionDetailComponent,
    resolve: {
      cobranzaOperacion: CobranzaOperacionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CobranzaOperacionUpdateComponent,
    resolve: {
      cobranzaOperacion: CobranzaOperacionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CobranzaOperacionUpdateComponent,
    resolve: {
      cobranzaOperacion: CobranzaOperacionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cobranzaOperacionRoute)],
  exports: [RouterModule],
})
export class CobranzaOperacionRoutingModule {}
