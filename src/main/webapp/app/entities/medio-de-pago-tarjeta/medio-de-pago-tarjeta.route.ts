import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MedioDePagoTarjeta } from 'app/shared/model/medio-de-pago-tarjeta.model';
import { MedioDePagoTarjetaService } from './medio-de-pago-tarjeta.service';
import { MedioDePagoTarjetaComponent } from './medio-de-pago-tarjeta.component';
import { MedioDePagoTarjetaDetailComponent } from './medio-de-pago-tarjeta-detail.component';
import { MedioDePagoTarjetaUpdateComponent } from './medio-de-pago-tarjeta-update.component';
import { MedioDePagoTarjetaDeletePopupComponent } from './medio-de-pago-tarjeta-delete-dialog.component';
import { IMedioDePagoTarjeta } from 'app/shared/model/medio-de-pago-tarjeta.model';

@Injectable({ providedIn: 'root' })
export class MedioDePagoTarjetaResolve implements Resolve<IMedioDePagoTarjeta> {
  constructor(private service: MedioDePagoTarjetaService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMedioDePagoTarjeta> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<MedioDePagoTarjeta>) => response.ok),
        map((medioDePagoTarjeta: HttpResponse<MedioDePagoTarjeta>) => medioDePagoTarjeta.body)
      );
    }
    return of(new MedioDePagoTarjeta());
  }
}

export const medioDePagoTarjetaRoute: Routes = [
  {
    path: '',
    component: MedioDePagoTarjetaComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MedioDePagoTarjetas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MedioDePagoTarjetaDetailComponent,
    resolve: {
      medioDePagoTarjeta: MedioDePagoTarjetaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MedioDePagoTarjetas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MedioDePagoTarjetaUpdateComponent,
    resolve: {
      medioDePagoTarjeta: MedioDePagoTarjetaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MedioDePagoTarjetas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MedioDePagoTarjetaUpdateComponent,
    resolve: {
      medioDePagoTarjeta: MedioDePagoTarjetaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MedioDePagoTarjetas'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const medioDePagoTarjetaPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: MedioDePagoTarjetaDeletePopupComponent,
    resolve: {
      medioDePagoTarjeta: MedioDePagoTarjetaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MedioDePagoTarjetas'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
