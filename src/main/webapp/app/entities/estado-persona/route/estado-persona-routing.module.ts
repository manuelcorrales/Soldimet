import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EstadoPersonaComponent } from '../list/estado-persona.component';
import { EstadoPersonaDetailComponent } from '../detail/estado-persona-detail.component';
import { EstadoPersonaUpdateComponent } from '../update/estado-persona-update.component';
import { EstadoPersonaRoutingResolveService } from './estado-persona-routing-resolve.service';

const estadoPersonaRoute: Routes = [
  {
    path: '',
    component: EstadoPersonaComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EstadoPersonaDetailComponent,
    resolve: {
      estadoPersona: EstadoPersonaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EstadoPersonaUpdateComponent,
    resolve: {
      estadoPersona: EstadoPersonaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EstadoPersonaUpdateComponent,
    resolve: {
      estadoPersona: EstadoPersonaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(estadoPersonaRoute)],
  exports: [RouterModule],
})
export class EstadoPersonaRoutingModule {}
