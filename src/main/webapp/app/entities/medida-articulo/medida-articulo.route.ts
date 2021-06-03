import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MedidaArticulo } from 'app/shared/model/medida-articulo.model';
import { MedidaArticuloService } from './medida-articulo.service';
import { MedidaArticuloComponent } from './medida-articulo.component';
import { MedidaArticuloDetailComponent } from './medida-articulo-detail.component';
import { MedidaArticuloUpdateComponent } from './medida-articulo-update.component';
import { MedidaArticuloDeletePopupComponent } from './medida-articulo-delete-dialog.component';
import { IMedidaArticulo } from 'app/shared/model/medida-articulo.model';

@Injectable({ providedIn: 'root' })
export class MedidaArticuloResolve implements Resolve<IMedidaArticulo> {
  constructor(private service: MedidaArticuloService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMedidaArticulo> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<MedidaArticulo>) => response.ok),
        map((medidaArticulo: HttpResponse<MedidaArticulo>) => medidaArticulo.body)
      );
    }
    return of(new MedidaArticulo());
  }
}

export const medidaArticuloRoute: Routes = [
  {
    path: '',
    component: MedidaArticuloComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MedidaArticulos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MedidaArticuloDetailComponent,
    resolve: {
      medidaArticulo: MedidaArticuloResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MedidaArticulos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MedidaArticuloUpdateComponent,
    resolve: {
      medidaArticulo: MedidaArticuloResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MedidaArticulos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MedidaArticuloUpdateComponent,
    resolve: {
      medidaArticulo: MedidaArticuloResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MedidaArticulos'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const medidaArticuloPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: MedidaArticuloDeletePopupComponent,
    resolve: {
      medidaArticulo: MedidaArticuloResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MedidaArticulos'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
