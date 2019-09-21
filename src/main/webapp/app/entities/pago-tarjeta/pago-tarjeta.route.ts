import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PagoTarjeta } from 'app/shared/model/pago-tarjeta.model';
import { PagoTarjetaService } from './pago-tarjeta.service';
import { PagoTarjetaComponent } from './pago-tarjeta.component';
import { PagoTarjetaDetailComponent } from './pago-tarjeta-detail.component';
import { PagoTarjetaUpdateComponent } from './pago-tarjeta-update.component';
import { PagoTarjetaDeletePopupComponent } from './pago-tarjeta-delete-dialog.component';
import { IPagoTarjeta } from 'app/shared/model/pago-tarjeta.model';

@Injectable({ providedIn: 'root' })
export class PagoTarjetaResolve implements Resolve<IPagoTarjeta> {
  constructor(private service: PagoTarjetaService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPagoTarjeta> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<PagoTarjeta>) => response.ok),
        map((pagoTarjeta: HttpResponse<PagoTarjeta>) => pagoTarjeta.body)
      );
    }
    return of(new PagoTarjeta());
  }
}

export const pagoTarjetaRoute: Routes = [
  {
    path: '',
    component: PagoTarjetaComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PagoTarjetas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PagoTarjetaDetailComponent,
    resolve: {
      pagoTarjeta: PagoTarjetaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PagoTarjetas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PagoTarjetaUpdateComponent,
    resolve: {
      pagoTarjeta: PagoTarjetaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PagoTarjetas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PagoTarjetaUpdateComponent,
    resolve: {
      pagoTarjeta: PagoTarjetaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PagoTarjetas'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const pagoTarjetaPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PagoTarjetaDeletePopupComponent,
    resolve: {
      pagoTarjeta: PagoTarjetaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PagoTarjetas'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
