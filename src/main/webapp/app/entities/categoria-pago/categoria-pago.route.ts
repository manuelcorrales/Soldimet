import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CategoriaPago } from 'app/shared/model/categoria-pago.model';
import { CategoriaPagoService } from 'app/entities/categoria-pago/categoria-pago.service';
import { CategoriaPagoComponent } from 'app/entities/categoria-pago/categoria-pago.component';
import { CategoriaPagoDetailComponent } from 'app/entities/categoria-pago/categoria-pago-detail.component';
import { CategoriaPagoUpdateComponent } from 'app/entities/categoria-pago/categoria-pago-update.component';
import { CategoriaPagoDeletePopupComponent } from 'app/entities/categoria-pago/categoria-pago-delete-dialog.component';
import { ICategoriaPago } from 'app/shared/model/categoria-pago.model';

@Injectable({ providedIn: 'root' })
export class CategoriaPagoResolve implements Resolve<ICategoriaPago> {
  constructor(private service: CategoriaPagoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICategoriaPago> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<CategoriaPago>) => response.ok),
        map((categoriaPago: HttpResponse<CategoriaPago>) => categoriaPago.body)
      );
    }
    return of(new CategoriaPago());
  }
}

export const categoriaPagoRoute: Routes = [
  {
    path: '',
    component: CategoriaPagoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CategoriaPagos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CategoriaPagoDetailComponent,
    resolve: {
      categoriaPago: CategoriaPagoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CategoriaPagos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CategoriaPagoUpdateComponent,
    resolve: {
      categoriaPago: CategoriaPagoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CategoriaPagos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CategoriaPagoUpdateComponent,
    resolve: {
      categoriaPago: CategoriaPagoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CategoriaPagos'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const categoriaPagoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CategoriaPagoDeletePopupComponent,
    resolve: {
      categoriaPago: CategoriaPagoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CategoriaPagos'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
