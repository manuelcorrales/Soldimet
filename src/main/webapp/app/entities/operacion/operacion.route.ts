import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Operacion } from 'app/shared/model/operacion.model';
import { OperacionService } from './operacion.service';
import { OperacionComponent } from './operacion.component';
import { OperacionDetailComponent } from './operacion-detail.component';
import { OperacionUpdateComponent } from './operacion-update.component';
import { OperacionDeletePopupComponent } from './operacion-delete-dialog.component';
import { IOperacion } from 'app/shared/model/operacion.model';

@Injectable({ providedIn: 'root' })
export class OperacionResolve implements Resolve<IOperacion> {
  constructor(private service: OperacionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IOperacion> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Operacion>) => response.ok),
        map((operacion: HttpResponse<Operacion>) => operacion.body)
      );
    }
    return of(new Operacion());
  }
}

export const operacionRoute: Routes = [
  {
    path: '',
    component: OperacionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Operacions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: OperacionDetailComponent,
    resolve: {
      operacion: OperacionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Operacions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: OperacionUpdateComponent,
    resolve: {
      operacion: OperacionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Operacions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: OperacionUpdateComponent,
    resolve: {
      operacion: OperacionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Operacions'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const operacionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: OperacionDeletePopupComponent,
    resolve: {
      operacion: OperacionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Operacions'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
