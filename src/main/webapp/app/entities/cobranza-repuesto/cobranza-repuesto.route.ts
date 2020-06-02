import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CobranzaRepuesto } from 'app/shared/model/cobranza-repuesto.model';
import { CobranzaRepuestoService } from './cobranza-repuesto.service';
import { CobranzaRepuestoComponent } from './cobranza-repuesto.component';
import { CobranzaRepuestoDetailComponent } from './cobranza-repuesto-detail.component';
import { CobranzaRepuestoUpdateComponent } from './cobranza-repuesto-update.component';
import { CobranzaRepuestoDeletePopupComponent } from './cobranza-repuesto-delete-dialog.component';
import { ICobranzaRepuesto } from 'app/shared/model/cobranza-repuesto.model';

@Injectable({ providedIn: 'root' })
export class CobranzaRepuestoResolve implements Resolve<ICobranzaRepuesto> {
  constructor(private service: CobranzaRepuestoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICobranzaRepuesto> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<CobranzaRepuesto>) => response.ok),
        map((cobranzaRepuesto: HttpResponse<CobranzaRepuesto>) => cobranzaRepuesto.body)
      );
    }
    return of(new CobranzaRepuesto());
  }
}

export const cobranzaRepuestoRoute: Routes = [
  {
    path: '',
    component: CobranzaRepuestoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CobranzaRepuestos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CobranzaRepuestoDetailComponent,
    resolve: {
      cobranzaRepuesto: CobranzaRepuestoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CobranzaRepuestos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CobranzaRepuestoUpdateComponent,
    resolve: {
      cobranzaRepuesto: CobranzaRepuestoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CobranzaRepuestos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CobranzaRepuestoUpdateComponent,
    resolve: {
      cobranzaRepuesto: CobranzaRepuestoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CobranzaRepuestos'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const cobranzaRepuestoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CobranzaRepuestoDeletePopupComponent,
    resolve: {
      cobranzaRepuesto: CobranzaRepuestoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CobranzaRepuestos'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
