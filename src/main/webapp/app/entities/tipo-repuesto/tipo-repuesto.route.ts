import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TipoRepuesto } from 'app/shared/model/tipo-repuesto.model';
import { TipoRepuestoService } from './tipo-repuesto.service';
import { TipoRepuestoComponent } from './tipo-repuesto.component';
import { TipoRepuestoDetailComponent } from './tipo-repuesto-detail.component';
import { TipoRepuestoUpdateComponent } from './tipo-repuesto-update.component';
import { TipoRepuestoDeletePopupComponent } from './tipo-repuesto-delete-dialog.component';
import { ITipoRepuesto } from 'app/shared/model/tipo-repuesto.model';

@Injectable({ providedIn: 'root' })
export class TipoRepuestoResolve implements Resolve<ITipoRepuesto> {
  constructor(private service: TipoRepuestoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITipoRepuesto> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TipoRepuesto>) => response.ok),
        map((tipoRepuesto: HttpResponse<TipoRepuesto>) => tipoRepuesto.body)
      );
    }
    return of(new TipoRepuesto());
  }
}

export const tipoRepuestoRoute: Routes = [
  {
    path: '',
    component: TipoRepuestoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoRepuestos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TipoRepuestoDetailComponent,
    resolve: {
      tipoRepuesto: TipoRepuestoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoRepuestos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TipoRepuestoUpdateComponent,
    resolve: {
      tipoRepuesto: TipoRepuestoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoRepuestos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TipoRepuestoUpdateComponent,
    resolve: {
      tipoRepuesto: TipoRepuestoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoRepuestos'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const tipoRepuestoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TipoRepuestoDeletePopupComponent,
    resolve: {
      tipoRepuesto: TipoRepuestoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoRepuestos'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
