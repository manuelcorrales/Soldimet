import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CostoOperacion } from 'app/shared/model/costo-operacion.model';
import { CostoOperacionService } from './costo-operacion.service';
import { CostoOperacionComponent } from './costo-operacion.component';
import { CostoOperacionDetailComponent } from './costo-operacion-detail.component';
import { CostoOperacionUpdateComponent } from './costo-operacion-update.component';
import { CostoOperacionDeletePopupComponent } from './costo-operacion-delete-dialog.component';
import { ICostoOperacion } from 'app/shared/model/costo-operacion.model';

@Injectable({ providedIn: 'root' })
export class CostoOperacionResolve implements Resolve<ICostoOperacion> {
  constructor(private service: CostoOperacionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICostoOperacion> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<CostoOperacion>) => response.ok),
        map((costoOperacion: HttpResponse<CostoOperacion>) => costoOperacion.body)
      );
    }
    return of(new CostoOperacion());
  }
}

export const costoOperacionRoute: Routes = [
  {
    path: '',
    component: CostoOperacionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CostoOperacions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CostoOperacionDetailComponent,
    resolve: {
      costoOperacion: CostoOperacionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CostoOperacions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CostoOperacionUpdateComponent,
    resolve: {
      costoOperacion: CostoOperacionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CostoOperacions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CostoOperacionUpdateComponent,
    resolve: {
      costoOperacion: CostoOperacionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CostoOperacions'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const costoOperacionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CostoOperacionDeletePopupComponent,
    resolve: {
      costoOperacion: CostoOperacionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CostoOperacions'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
