import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FormaDePago } from 'app/shared/model/forma-de-pago.model';
import { FormaDePagoService } from './forma-de-pago.service';
import { FormaDePagoComponent } from './forma-de-pago.component';
import { FormaDePagoDetailComponent } from './forma-de-pago-detail.component';
import { FormaDePagoUpdateComponent } from './forma-de-pago-update.component';
import { FormaDePagoDeletePopupComponent } from './forma-de-pago-delete-dialog.component';
import { IFormaDePago } from 'app/shared/model/forma-de-pago.model';

@Injectable({ providedIn: 'root' })
export class FormaDePagoResolve implements Resolve<IFormaDePago> {
  constructor(private service: FormaDePagoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFormaDePago> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<FormaDePago>) => response.ok),
        map((formaDePago: HttpResponse<FormaDePago>) => formaDePago.body)
      );
    }
    return of(new FormaDePago());
  }
}

export const formaDePagoRoute: Routes = [
  {
    path: '',
    component: FormaDePagoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'FormaDePagos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FormaDePagoDetailComponent,
    resolve: {
      formaDePago: FormaDePagoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'FormaDePagos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FormaDePagoUpdateComponent,
    resolve: {
      formaDePago: FormaDePagoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'FormaDePagos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FormaDePagoUpdateComponent,
    resolve: {
      formaDePago: FormaDePagoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'FormaDePagos'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const formaDePagoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: FormaDePagoDeletePopupComponent,
    resolve: {
      formaDePago: FormaDePagoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'FormaDePagos'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
