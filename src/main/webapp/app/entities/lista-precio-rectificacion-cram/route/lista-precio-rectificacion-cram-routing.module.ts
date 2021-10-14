import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ListaPrecioRectificacionCRAMComponent } from '../list/lista-precio-rectificacion-cram.component';
import { ListaPrecioRectificacionCRAMDetailComponent } from '../detail/lista-precio-rectificacion-cram-detail.component';
import { ListaPrecioRectificacionCRAMUpdateComponent } from '../update/lista-precio-rectificacion-cram-update.component';
import { ListaPrecioRectificacionCRAMRoutingResolveService } from './lista-precio-rectificacion-cram-routing-resolve.service';

const listaPrecioRectificacionCRAMRoute: Routes = [
  {
    path: '',
    component: ListaPrecioRectificacionCRAMComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ListaPrecioRectificacionCRAMDetailComponent,
    resolve: {
      listaPrecioRectificacionCRAM: ListaPrecioRectificacionCRAMRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ListaPrecioRectificacionCRAMUpdateComponent,
    resolve: {
      listaPrecioRectificacionCRAM: ListaPrecioRectificacionCRAMRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ListaPrecioRectificacionCRAMUpdateComponent,
    resolve: {
      listaPrecioRectificacionCRAM: ListaPrecioRectificacionCRAMRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(listaPrecioRectificacionCRAMRoute)],
  exports: [RouterModule],
})
export class ListaPrecioRectificacionCRAMRoutingModule {}
