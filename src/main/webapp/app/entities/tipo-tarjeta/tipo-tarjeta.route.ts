import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TipoTarjeta } from 'app/shared/model/tipo-tarjeta.model';
import { TipoTarjetaService } from './tipo-tarjeta.service';
import { TipoTarjetaComponent } from './tipo-tarjeta.component';
import { TipoTarjetaDetailComponent } from './tipo-tarjeta-detail.component';
import { TipoTarjetaUpdateComponent } from './tipo-tarjeta-update.component';
import { TipoTarjetaDeletePopupComponent } from './tipo-tarjeta-delete-dialog.component';
import { ITipoTarjeta } from 'app/shared/model/tipo-tarjeta.model';

@Injectable({ providedIn: 'root' })
export class TipoTarjetaResolve implements Resolve<ITipoTarjeta> {
  constructor(private service: TipoTarjetaService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITipoTarjeta> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TipoTarjeta>) => response.ok),
        map((tipoTarjeta: HttpResponse<TipoTarjeta>) => tipoTarjeta.body)
      );
    }
    return of(new TipoTarjeta());
  }
}

export const tipoTarjetaRoute: Routes = [
  {
    path: '',
    component: TipoTarjetaComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoTarjetas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TipoTarjetaDetailComponent,
    resolve: {
      tipoTarjeta: TipoTarjetaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoTarjetas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TipoTarjetaUpdateComponent,
    resolve: {
      tipoTarjeta: TipoTarjetaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoTarjetas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TipoTarjetaUpdateComponent,
    resolve: {
      tipoTarjeta: TipoTarjetaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoTarjetas'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const tipoTarjetaPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TipoTarjetaDeletePopupComponent,
    resolve: {
      tipoTarjeta: TipoTarjetaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoTarjetas'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
