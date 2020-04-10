import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PagoEfectivo } from 'app/shared/model/pago-efectivo.model';
import { PagoEfectivoService } from 'app/entities/pago-efectivo/pago-efectivo.service';
import { PagoEfectivoComponent } from 'app/entities/pago-efectivo/pago-efectivo.component';
import { PagoEfectivoDetailComponent } from 'app/entities/pago-efectivo/pago-efectivo-detail.component';
import { PagoEfectivoUpdateComponent } from 'app/entities/pago-efectivo/pago-efectivo-update.component';
import { PagoEfectivoDeletePopupComponent } from 'app/entities/pago-efectivo/pago-efectivo-delete-dialog.component';
import { IPagoEfectivo } from 'app/shared/model/pago-efectivo.model';

@Injectable({ providedIn: 'root' })
export class PagoEfectivoResolve implements Resolve<IPagoEfectivo> {
  constructor(private service: PagoEfectivoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPagoEfectivo> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<PagoEfectivo>) => response.ok),
        map((pagoEfectivo: HttpResponse<PagoEfectivo>) => pagoEfectivo.body)
      );
    }
    return of(new PagoEfectivo());
  }
}

export const pagoEfectivoRoute: Routes = [
  {
    path: '',
    component: PagoEfectivoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PagoEfectivos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PagoEfectivoDetailComponent,
    resolve: {
      pagoEfectivo: PagoEfectivoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PagoEfectivos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PagoEfectivoUpdateComponent,
    resolve: {
      pagoEfectivo: PagoEfectivoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PagoEfectivos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PagoEfectivoUpdateComponent,
    resolve: {
      pagoEfectivo: PagoEfectivoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PagoEfectivos'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const pagoEfectivoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PagoEfectivoDeletePopupComponent,
    resolve: {
      pagoEfectivo: PagoEfectivoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PagoEfectivos'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
