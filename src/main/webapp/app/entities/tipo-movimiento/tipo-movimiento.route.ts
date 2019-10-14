import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TipoMovimiento } from 'app/shared/model/tipo-movimiento.model';
import { TipoMovimientoService } from './tipo-movimiento.service';
import { TipoMovimientoComponent } from './tipo-movimiento.component';
import { TipoMovimientoDetailComponent } from './tipo-movimiento-detail.component';
import { TipoMovimientoUpdateComponent } from './tipo-movimiento-update.component';
import { TipoMovimientoDeletePopupComponent } from './tipo-movimiento-delete-dialog.component';
import { ITipoMovimiento } from 'app/shared/model/tipo-movimiento.model';

@Injectable({ providedIn: 'root' })
export class TipoMovimientoResolve implements Resolve<ITipoMovimiento> {
  constructor(private service: TipoMovimientoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITipoMovimiento> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TipoMovimiento>) => response.ok),
        map((tipoMovimiento: HttpResponse<TipoMovimiento>) => tipoMovimiento.body)
      );
    }
    return of(new TipoMovimiento());
  }
}

export const tipoMovimientoRoute: Routes = [
  {
    path: '',
    component: TipoMovimientoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoMovimientos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TipoMovimientoDetailComponent,
    resolve: {
      tipoMovimiento: TipoMovimientoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoMovimientos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TipoMovimientoUpdateComponent,
    resolve: {
      tipoMovimiento: TipoMovimientoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoMovimientos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TipoMovimientoUpdateComponent,
    resolve: {
      tipoMovimiento: TipoMovimientoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoMovimientos'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const tipoMovimientoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TipoMovimientoDeletePopupComponent,
    resolve: {
      tipoMovimiento: TipoMovimientoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoMovimientos'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
