import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Movimiento } from 'app/shared/model/movimiento.model';
import { MovimientoService } from './movimiento.service';
import { MovimientoComponent } from './movimiento.component';
import { MovimientoDetailComponent } from './movimiento-detail.component';
import { MovimientoUpdateComponent } from './movimiento-update.component';
import { MovimientoDeletePopupComponent } from './movimiento-delete-dialog.component';
import { IMovimiento } from 'app/shared/model/movimiento.model';

@Injectable({ providedIn: 'root' })
export class MovimientoResolve implements Resolve<IMovimiento> {
  constructor(private service: MovimientoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMovimiento> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Movimiento>) => response.ok),
        map((movimiento: HttpResponse<Movimiento>) => movimiento.body)
      );
    }
    return of(new Movimiento());
  }
}

export const movimientoRoute: Routes = [
  {
    path: '',
    component: MovimientoComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'Movimientos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MovimientoDetailComponent,
    resolve: {
      movimiento: MovimientoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Movimientos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MovimientoUpdateComponent,
    resolve: {
      movimiento: MovimientoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Movimientos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MovimientoUpdateComponent,
    resolve: {
      movimiento: MovimientoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Movimientos'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const movimientoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: MovimientoDeletePopupComponent,
    resolve: {
      movimiento: MovimientoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Movimientos'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
