import { Routes } from '@angular/router';

import { StockModalPopupComponent } from './create-update-stock/stock-popup-service';
import { StockComponent } from './stock.component';
import { UserRouteAccessService } from './../core/auth/user-route-access.service';

export const STOCK_ROUTES: Routes = [
  {
    path: 'stock',
    component: StockComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Stock',
    },
    canActivate: [UserRouteAccessService],
  },
];

export const STOCK_POPUP_ROUTE: Routes = [
  {
    path: 'nuevo',
    component: StockModalPopupComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'StockArticulos',
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup',
  },
  {
    path: 'stock/:id/editar',
    component: StockModalPopupComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Editar Stock',
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup',
  },
];
