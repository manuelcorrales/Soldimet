import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DetalleMovimiento } from 'app/shared/model/detalle-movimiento.model';
import { DetalleMovimientoService } from './detalle-movimiento.service';
import { DetalleMovimientoComponent } from './detalle-movimiento.component';
import { DetalleMovimientoDetailComponent } from './detalle-movimiento-detail.component';
import { DetalleMovimientoUpdateComponent } from './detalle-movimiento-update.component';
import { DetalleMovimientoDeletePopupComponent } from './detalle-movimiento-delete-dialog.component';
import { IDetalleMovimiento } from 'app/shared/model/detalle-movimiento.model';

@Injectable({ providedIn: 'root' })
export class DetalleMovimientoResolve implements Resolve<IDetalleMovimiento> {
  constructor(private service: DetalleMovimientoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDetalleMovimiento> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<DetalleMovimiento>) => response.ok),
        map((detalleMovimiento: HttpResponse<DetalleMovimiento>) => detalleMovimiento.body)
      );
    }
    return of(new DetalleMovimiento());
  }
}

export const detalleMovimientoRoute: Routes = [
  {
    path: '',
    component: DetalleMovimientoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DetalleMovimientos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DetalleMovimientoDetailComponent,
    resolve: {
      detalleMovimiento: DetalleMovimientoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DetalleMovimientos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DetalleMovimientoUpdateComponent,
    resolve: {
      detalleMovimiento: DetalleMovimientoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DetalleMovimientos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DetalleMovimientoUpdateComponent,
    resolve: {
      detalleMovimiento: DetalleMovimientoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DetalleMovimientos'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const detalleMovimientoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: DetalleMovimientoDeletePopupComponent,
    resolve: {
      detalleMovimiento: DetalleMovimientoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DetalleMovimientos'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
