import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EstadoMovimiento } from 'app/shared/model/estado-movimiento.model';
import { EstadoMovimientoService } from 'app/entities/estado-movimiento/estado-movimiento.service';
import { EstadoMovimientoComponent } from 'app/entities/estado-movimiento/estado-movimiento.component';
import { EstadoMovimientoDetailComponent } from 'app/entities/estado-movimiento/estado-movimiento-detail.component';
import { EstadoMovimientoUpdateComponent } from 'app/entities/estado-movimiento/estado-movimiento-update.component';
import { EstadoMovimientoDeletePopupComponent } from 'app/entities/estado-movimiento/estado-movimiento-delete-dialog.component';
import { IEstadoMovimiento } from 'app/shared/model/estado-movimiento.model';

@Injectable({ providedIn: 'root' })
export class EstadoMovimientoResolve implements Resolve<IEstadoMovimiento> {
  constructor(private service: EstadoMovimientoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEstadoMovimiento> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<EstadoMovimiento>) => response.ok),
        map((estadoMovimiento: HttpResponse<EstadoMovimiento>) => estadoMovimiento.body)
      );
    }
    return of(new EstadoMovimiento());
  }
}

export const estadoMovimientoRoute: Routes = [
  {
    path: '',
    component: EstadoMovimientoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EstadoMovimientos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EstadoMovimientoDetailComponent,
    resolve: {
      estadoMovimiento: EstadoMovimientoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EstadoMovimientos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EstadoMovimientoUpdateComponent,
    resolve: {
      estadoMovimiento: EstadoMovimientoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EstadoMovimientos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EstadoMovimientoUpdateComponent,
    resolve: {
      estadoMovimiento: EstadoMovimientoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EstadoMovimientos'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const estadoMovimientoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: EstadoMovimientoDeletePopupComponent,
    resolve: {
      estadoMovimiento: EstadoMovimientoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EstadoMovimientos'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
