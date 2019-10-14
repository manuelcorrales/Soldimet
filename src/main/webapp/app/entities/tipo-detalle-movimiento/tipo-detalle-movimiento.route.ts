import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TipoDetalleMovimiento } from 'app/shared/model/tipo-detalle-movimiento.model';
import { TipoDetalleMovimientoService } from './tipo-detalle-movimiento.service';
import { TipoDetalleMovimientoComponent } from './tipo-detalle-movimiento.component';
import { TipoDetalleMovimientoDetailComponent } from './tipo-detalle-movimiento-detail.component';
import { TipoDetalleMovimientoUpdateComponent } from './tipo-detalle-movimiento-update.component';
import { TipoDetalleMovimientoDeletePopupComponent } from './tipo-detalle-movimiento-delete-dialog.component';
import { ITipoDetalleMovimiento } from 'app/shared/model/tipo-detalle-movimiento.model';

@Injectable({ providedIn: 'root' })
export class TipoDetalleMovimientoResolve implements Resolve<ITipoDetalleMovimiento> {
  constructor(private service: TipoDetalleMovimientoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITipoDetalleMovimiento> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TipoDetalleMovimiento>) => response.ok),
        map((tipoDetalleMovimiento: HttpResponse<TipoDetalleMovimiento>) => tipoDetalleMovimiento.body)
      );
    }
    return of(new TipoDetalleMovimiento());
  }
}

export const tipoDetalleMovimientoRoute: Routes = [
  {
    path: '',
    component: TipoDetalleMovimientoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoDetalleMovimientos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TipoDetalleMovimientoDetailComponent,
    resolve: {
      tipoDetalleMovimiento: TipoDetalleMovimientoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoDetalleMovimientos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TipoDetalleMovimientoUpdateComponent,
    resolve: {
      tipoDetalleMovimiento: TipoDetalleMovimientoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoDetalleMovimientos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TipoDetalleMovimientoUpdateComponent,
    resolve: {
      tipoDetalleMovimiento: TipoDetalleMovimientoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoDetalleMovimientos'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const tipoDetalleMovimientoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TipoDetalleMovimientoDeletePopupComponent,
    resolve: {
      tipoDetalleMovimiento: TipoDetalleMovimientoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoDetalleMovimientos'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
