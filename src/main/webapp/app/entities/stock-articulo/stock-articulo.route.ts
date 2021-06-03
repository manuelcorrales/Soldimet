import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StockArticulo } from 'app/shared/model/stock-articulo.model';
import { StockArticuloService } from './stock-articulo.service';
import { StockArticuloComponent } from './stock-articulo.component';
import { StockArticuloDetailComponent } from './stock-articulo-detail.component';
import { StockArticuloUpdateComponent } from './stock-articulo-update.component';
import { StockArticuloDeletePopupComponent } from './stock-articulo-delete-dialog.component';
import { IStockArticulo } from 'app/shared/model/stock-articulo.model';

@Injectable({ providedIn: 'root' })
export class StockArticuloResolve implements Resolve<IStockArticulo> {
  constructor(private service: StockArticuloService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IStockArticulo> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<StockArticulo>) => response.ok),
        map((stockArticulo: HttpResponse<StockArticulo>) => stockArticulo.body)
      );
    }
    return of(new StockArticulo());
  }
}

export const stockArticuloRoute: Routes = [
  {
    path: '',
    component: StockArticuloComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'StockArticulos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: StockArticuloDetailComponent,
    resolve: {
      stockArticulo: StockArticuloResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'StockArticulos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: StockArticuloUpdateComponent,
    resolve: {
      stockArticulo: StockArticuloResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'StockArticulos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: StockArticuloUpdateComponent,
    resolve: {
      stockArticulo: StockArticuloResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'StockArticulos'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const stockArticuloPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: StockArticuloDeletePopupComponent,
    resolve: {
      stockArticulo: StockArticuloResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'StockArticulos'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
