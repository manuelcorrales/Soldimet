import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ListaPrecioDesdeHastaComponent } from '../list/lista-precio-desde-hasta.component';
import { ListaPrecioDesdeHastaDetailComponent } from '../detail/lista-precio-desde-hasta-detail.component';
import { ListaPrecioDesdeHastaUpdateComponent } from '../update/lista-precio-desde-hasta-update.component';
import { ListaPrecioDesdeHastaRoutingResolveService } from './lista-precio-desde-hasta-routing-resolve.service';

const listaPrecioDesdeHastaRoute: Routes = [
  {
    path: '',
    component: ListaPrecioDesdeHastaComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ListaPrecioDesdeHastaDetailComponent,
    resolve: {
      listaPrecioDesdeHasta: ListaPrecioDesdeHastaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ListaPrecioDesdeHastaUpdateComponent,
    resolve: {
      listaPrecioDesdeHasta: ListaPrecioDesdeHastaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ListaPrecioDesdeHastaUpdateComponent,
    resolve: {
      listaPrecioDesdeHasta: ListaPrecioDesdeHastaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(listaPrecioDesdeHastaRoute)],
  exports: [RouterModule],
})
export class ListaPrecioDesdeHastaRoutingModule {}
