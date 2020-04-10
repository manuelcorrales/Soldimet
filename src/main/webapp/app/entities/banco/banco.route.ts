import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Banco } from 'app/shared/model/banco.model';
import { BancoService } from 'app/entities/banco/banco.service';
import { BancoComponent } from 'app/entities/banco/banco.component';
import { BancoDetailComponent } from 'app/entities/banco/banco-detail.component';
import { BancoUpdateComponent } from 'app/entities/banco/banco-update.component';
import { BancoDeletePopupComponent } from 'app/entities/banco/banco-delete-dialog.component';
import { IBanco } from 'app/shared/model/banco.model';

@Injectable({ providedIn: 'root' })
export class BancoResolve implements Resolve<IBanco> {
  constructor(private service: BancoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBanco> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Banco>) => response.ok),
        map((banco: HttpResponse<Banco>) => banco.body)
      );
    }
    return of(new Banco());
  }
}

export const bancoRoute: Routes = [
  {
    path: '',
    component: BancoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Bancos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: BancoDetailComponent,
    resolve: {
      banco: BancoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Bancos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: BancoUpdateComponent,
    resolve: {
      banco: BancoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Bancos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: BancoUpdateComponent,
    resolve: {
      banco: BancoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Bancos'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const bancoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: BancoDeletePopupComponent,
    resolve: {
      banco: BancoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Bancos'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
