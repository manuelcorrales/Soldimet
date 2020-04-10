import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MedioDePago } from 'app/shared/model/medio-de-pago.model';
import { MedioDePagoService } from 'app/entities/medio-de-pago/medio-de-pago.service';
import { MedioDePagoComponent } from 'app/entities/medio-de-pago/medio-de-pago.component';
import { MedioDePagoDetailComponent } from 'app/entities/medio-de-pago/medio-de-pago-detail.component';
import { MedioDePagoUpdateComponent } from 'app/entities/medio-de-pago/medio-de-pago-update.component';
import { MedioDePagoDeletePopupComponent } from 'app/entities/medio-de-pago/medio-de-pago-delete-dialog.component';
import { IMedioDePago } from 'app/shared/model/medio-de-pago.model';

@Injectable({ providedIn: 'root' })
export class MedioDePagoResolve implements Resolve<IMedioDePago> {
  constructor(private service: MedioDePagoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMedioDePago> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<MedioDePago>) => response.ok),
        map((medioDePago: HttpResponse<MedioDePago>) => medioDePago.body)
      );
    }
    return of(new MedioDePago());
  }
}

export const medioDePagoRoute: Routes = [
  {
    path: '',
    component: MedioDePagoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MedioDePagos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MedioDePagoDetailComponent,
    resolve: {
      medioDePago: MedioDePagoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MedioDePagos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MedioDePagoUpdateComponent,
    resolve: {
      medioDePago: MedioDePagoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MedioDePagos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MedioDePagoUpdateComponent,
    resolve: {
      medioDePago: MedioDePagoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MedioDePagos'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const medioDePagoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: MedioDePagoDeletePopupComponent,
    resolve: {
      medioDePago: MedioDePagoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MedioDePagos'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
