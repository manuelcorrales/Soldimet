import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CobranzaOperacion } from 'app/shared/model/cobranza-operacion.model';
import { CobranzaOperacionService } from './cobranza-operacion.service';
import { CobranzaOperacionComponent } from './cobranza-operacion.component';
import { CobranzaOperacionDetailComponent } from './cobranza-operacion-detail.component';
import { CobranzaOperacionUpdateComponent } from './cobranza-operacion-update.component';
import { CobranzaOperacionDeletePopupComponent } from './cobranza-operacion-delete-dialog.component';
import { ICobranzaOperacion } from 'app/shared/model/cobranza-operacion.model';

@Injectable({ providedIn: 'root' })
export class CobranzaOperacionResolve implements Resolve<ICobranzaOperacion> {
  constructor(private service: CobranzaOperacionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICobranzaOperacion> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<CobranzaOperacion>) => response.ok),
        map((cobranzaOperacion: HttpResponse<CobranzaOperacion>) => cobranzaOperacion.body)
      );
    }
    return of(new CobranzaOperacion());
  }
}

export const cobranzaOperacionRoute: Routes = [
  {
    path: '',
    component: CobranzaOperacionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CobranzaOperacions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CobranzaOperacionDetailComponent,
    resolve: {
      cobranzaOperacion: CobranzaOperacionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CobranzaOperacions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CobranzaOperacionUpdateComponent,
    resolve: {
      cobranzaOperacion: CobranzaOperacionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CobranzaOperacions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CobranzaOperacionUpdateComponent,
    resolve: {
      cobranzaOperacion: CobranzaOperacionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CobranzaOperacions'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const cobranzaOperacionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CobranzaOperacionDeletePopupComponent,
    resolve: {
      cobranzaOperacion: CobranzaOperacionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CobranzaOperacions'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
