import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MedioDePagoCheque } from 'app/shared/model/medio-de-pago-cheque.model';
import { MedioDePagoChequeService } from 'app/entities/medio-de-pago-cheque/medio-de-pago-cheque.service';
import { MedioDePagoChequeComponent } from 'app/entities/medio-de-pago-cheque/medio-de-pago-cheque.component';
import { MedioDePagoChequeDetailComponent } from 'app/entities/medio-de-pago-cheque/medio-de-pago-cheque-detail.component';
import { MedioDePagoChequeUpdateComponent } from 'app/entities/medio-de-pago-cheque/medio-de-pago-cheque-update.component';
import { MedioDePagoChequeDeletePopupComponent } from 'app/entities/medio-de-pago-cheque/medio-de-pago-cheque-delete-dialog.component';
import { IMedioDePagoCheque } from 'app/shared/model/medio-de-pago-cheque.model';

@Injectable({ providedIn: 'root' })
export class MedioDePagoChequeResolve implements Resolve<IMedioDePagoCheque> {
  constructor(private service: MedioDePagoChequeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMedioDePagoCheque> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<MedioDePagoCheque>) => response.ok),
        map((medioDePagoCheque: HttpResponse<MedioDePagoCheque>) => medioDePagoCheque.body)
      );
    }
    return of(new MedioDePagoCheque());
  }
}

export const medioDePagoChequeRoute: Routes = [
  {
    path: '',
    component: MedioDePagoChequeComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MedioDePagoCheques'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MedioDePagoChequeDetailComponent,
    resolve: {
      medioDePagoCheque: MedioDePagoChequeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MedioDePagoCheques'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MedioDePagoChequeUpdateComponent,
    resolve: {
      medioDePagoCheque: MedioDePagoChequeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MedioDePagoCheques'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MedioDePagoChequeUpdateComponent,
    resolve: {
      medioDePagoCheque: MedioDePagoChequeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MedioDePagoCheques'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const medioDePagoChequePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: MedioDePagoChequeDeletePopupComponent,
    resolve: {
      medioDePagoCheque: MedioDePagoChequeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MedioDePagoCheques'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
