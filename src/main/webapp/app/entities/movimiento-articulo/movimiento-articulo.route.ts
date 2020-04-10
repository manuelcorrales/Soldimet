import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MovimientoArticulo } from 'app/shared/model/movimiento-articulo.model';
import { MovimientoArticuloService } from 'app/entities/movimiento-articulo/movimiento-articulo.service';
import { MovimientoArticuloComponent } from 'app/entities/movimiento-articulo/movimiento-articulo.component';
import { MovimientoArticuloDetailComponent } from 'app/entities/movimiento-articulo/movimiento-articulo-detail.component';
import { MovimientoArticuloUpdateComponent } from 'app/entities/movimiento-articulo/movimiento-articulo-update.component';
import { MovimientoArticuloDeletePopupComponent } from 'app/entities/movimiento-articulo/movimiento-articulo-delete-dialog.component';
import { IMovimientoArticulo } from 'app/shared/model/movimiento-articulo.model';

@Injectable({ providedIn: 'root' })
export class MovimientoArticuloResolve implements Resolve<IMovimientoArticulo> {
  constructor(private service: MovimientoArticuloService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMovimientoArticulo> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<MovimientoArticulo>) => response.ok),
        map((movimientoArticulo: HttpResponse<MovimientoArticulo>) => movimientoArticulo.body)
      );
    }
    return of(new MovimientoArticulo());
  }
}

export const movimientoArticuloRoute: Routes = [
  {
    path: '',
    component: MovimientoArticuloComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MovimientoArticulos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MovimientoArticuloDetailComponent,
    resolve: {
      movimientoArticulo: MovimientoArticuloResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MovimientoArticulos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MovimientoArticuloUpdateComponent,
    resolve: {
      movimientoArticulo: MovimientoArticuloResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MovimientoArticulos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MovimientoArticuloUpdateComponent,
    resolve: {
      movimientoArticulo: MovimientoArticuloResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MovimientoArticulos'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const movimientoArticuloPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: MovimientoArticuloDeletePopupComponent,
    resolve: {
      movimientoArticulo: MovimientoArticuloResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MovimientoArticulos'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
