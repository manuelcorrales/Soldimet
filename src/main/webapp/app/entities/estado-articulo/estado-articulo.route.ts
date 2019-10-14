import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EstadoArticulo } from 'app/shared/model/estado-articulo.model';
import { EstadoArticuloService } from './estado-articulo.service';
import { EstadoArticuloComponent } from './estado-articulo.component';
import { EstadoArticuloDetailComponent } from './estado-articulo-detail.component';
import { EstadoArticuloUpdateComponent } from './estado-articulo-update.component';
import { EstadoArticuloDeletePopupComponent } from './estado-articulo-delete-dialog.component';
import { IEstadoArticulo } from 'app/shared/model/estado-articulo.model';

@Injectable({ providedIn: 'root' })
export class EstadoArticuloResolve implements Resolve<IEstadoArticulo> {
  constructor(private service: EstadoArticuloService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEstadoArticulo> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<EstadoArticulo>) => response.ok),
        map((estadoArticulo: HttpResponse<EstadoArticulo>) => estadoArticulo.body)
      );
    }
    return of(new EstadoArticulo());
  }
}

export const estadoArticuloRoute: Routes = [
  {
    path: '',
    component: EstadoArticuloComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EstadoArticulos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EstadoArticuloDetailComponent,
    resolve: {
      estadoArticulo: EstadoArticuloResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EstadoArticulos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EstadoArticuloUpdateComponent,
    resolve: {
      estadoArticulo: EstadoArticuloResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EstadoArticulos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EstadoArticuloUpdateComponent,
    resolve: {
      estadoArticulo: EstadoArticuloResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EstadoArticulos'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const estadoArticuloPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: EstadoArticuloDeletePopupComponent,
    resolve: {
      estadoArticulo: EstadoArticuloResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EstadoArticulos'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
