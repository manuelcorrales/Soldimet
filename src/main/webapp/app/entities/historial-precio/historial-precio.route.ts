import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HistorialPrecio } from 'app/shared/model/historial-precio.model';
import { HistorialPrecioService } from 'app/entities/historial-precio/historial-precio.service';
import { HistorialPrecioComponent } from 'app/entities/historial-precio/historial-precio.component';
import { HistorialPrecioDetailComponent } from 'app/entities/historial-precio/historial-precio-detail.component';
import { HistorialPrecioUpdateComponent } from 'app/entities/historial-precio/historial-precio-update.component';
import { HistorialPrecioDeletePopupComponent } from 'app/entities/historial-precio/historial-precio-delete-dialog.component';
import { IHistorialPrecio } from 'app/shared/model/historial-precio.model';

@Injectable({ providedIn: 'root' })
export class HistorialPrecioResolve implements Resolve<IHistorialPrecio> {
  constructor(private service: HistorialPrecioService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IHistorialPrecio> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<HistorialPrecio>) => response.ok),
        map((historialPrecio: HttpResponse<HistorialPrecio>) => historialPrecio.body)
      );
    }
    return of(new HistorialPrecio());
  }
}

export const historialPrecioRoute: Routes = [
  {
    path: '',
    component: HistorialPrecioComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'HistorialPrecios'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: HistorialPrecioDetailComponent,
    resolve: {
      historialPrecio: HistorialPrecioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'HistorialPrecios'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: HistorialPrecioUpdateComponent,
    resolve: {
      historialPrecio: HistorialPrecioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'HistorialPrecios'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: HistorialPrecioUpdateComponent,
    resolve: {
      historialPrecio: HistorialPrecioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'HistorialPrecios'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const historialPrecioPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: HistorialPrecioDeletePopupComponent,
    resolve: {
      historialPrecio: HistorialPrecioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'HistorialPrecios'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
