import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Cilindrada } from 'app/shared/model/cilindrada.model';
import { CilindradaService } from './cilindrada.service';
import { CilindradaComponent } from './cilindrada.component';
import { CilindradaDetailComponent } from './cilindrada-detail.component';
import { CilindradaUpdateComponent } from './cilindrada-update.component';
import { CilindradaDeletePopupComponent } from './cilindrada-delete-dialog.component';
import { ICilindrada } from 'app/shared/model/cilindrada.model';

@Injectable({ providedIn: 'root' })
export class CilindradaResolve implements Resolve<ICilindrada> {
  constructor(private service: CilindradaService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICilindrada> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Cilindrada>) => response.ok),
        map((cilindrada: HttpResponse<Cilindrada>) => cilindrada.body)
      );
    }
    return of(new Cilindrada());
  }
}

export const cilindradaRoute: Routes = [
  {
    path: '',
    component: CilindradaComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Cilindradas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CilindradaDetailComponent,
    resolve: {
      cilindrada: CilindradaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Cilindradas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CilindradaUpdateComponent,
    resolve: {
      cilindrada: CilindradaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Cilindradas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CilindradaUpdateComponent,
    resolve: {
      cilindrada: CilindradaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Cilindradas'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const cilindradaPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CilindradaDeletePopupComponent,
    resolve: {
      cilindrada: CilindradaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Cilindradas'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
