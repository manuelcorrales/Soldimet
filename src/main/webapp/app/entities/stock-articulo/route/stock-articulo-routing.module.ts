import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { StockArticuloComponent } from '../list/stock-articulo.component';
import { StockArticuloDetailComponent } from '../detail/stock-articulo-detail.component';
import { StockArticuloUpdateComponent } from '../update/stock-articulo-update.component';
import { StockArticuloRoutingResolveService } from './stock-articulo-routing-resolve.service';

const stockArticuloRoute: Routes = [
  {
    path: '',
    component: StockArticuloComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: StockArticuloDetailComponent,
    resolve: {
      stockArticulo: StockArticuloRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: StockArticuloUpdateComponent,
    resolve: {
      stockArticulo: StockArticuloRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: StockArticuloUpdateComponent,
    resolve: {
      stockArticulo: StockArticuloRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(stockArticuloRoute)],
  exports: [RouterModule],
})
export class StockArticuloRoutingModule {}
