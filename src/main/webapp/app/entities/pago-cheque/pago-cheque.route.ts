import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PagoCheque } from 'app/shared/model/pago-cheque.model';
import { PagoChequeService } from 'app/entities/pago-cheque/pago-cheque.service';
import { PagoChequeComponent } from 'app/entities/pago-cheque/pago-cheque.component';
import { PagoChequeDetailComponent } from 'app/entities/pago-cheque/pago-cheque-detail.component';
import { PagoChequeUpdateComponent } from 'app/entities/pago-cheque/pago-cheque-update.component';
import { PagoChequeDeletePopupComponent } from 'app/entities/pago-cheque/pago-cheque-delete-dialog.component';
import { IPagoCheque } from 'app/shared/model/pago-cheque.model';

@Injectable({ providedIn: 'root' })
export class PagoChequeResolve implements Resolve<IPagoCheque> {
  constructor(private service: PagoChequeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPagoCheque> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<PagoCheque>) => response.ok),
        map((pagoCheque: HttpResponse<PagoCheque>) => pagoCheque.body)
      );
    }
    return of(new PagoCheque());
  }
}

export const pagoChequeRoute: Routes = [
  {
    path: '',
    component: PagoChequeComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PagoCheques'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PagoChequeDetailComponent,
    resolve: {
      pagoCheque: PagoChequeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PagoCheques'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PagoChequeUpdateComponent,
    resolve: {
      pagoCheque: PagoChequeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PagoCheques'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PagoChequeUpdateComponent,
    resolve: {
      pagoCheque: PagoChequeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PagoCheques'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const pagoChequePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PagoChequeDeletePopupComponent,
    resolve: {
      pagoCheque: PagoChequeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PagoCheques'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
