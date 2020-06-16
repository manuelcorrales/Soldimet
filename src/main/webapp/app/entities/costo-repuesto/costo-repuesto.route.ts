import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CostoRepuesto } from 'app/shared/model/costo-repuesto.model';
import { CostoRepuestoService } from './costo-repuesto.service';
import { CostoRepuestoComponent } from './costo-repuesto.component';
import { CostoRepuestoDetailComponent } from './costo-repuesto-detail.component';
import { CostoRepuestoUpdateComponent } from './costo-repuesto-update.component';
import { CostoRepuestoDeletePopupComponent } from './costo-repuesto-delete-dialog.component';
import { ICostoRepuesto } from 'app/shared/model/costo-repuesto.model';

@Injectable({ providedIn: 'root' })
export class CostoRepuestoResolve implements Resolve<ICostoRepuesto> {
  constructor(private service: CostoRepuestoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICostoRepuesto> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<CostoRepuesto>) => response.ok),
        map((costoRepuesto: HttpResponse<CostoRepuesto>) => costoRepuesto.body)
      );
    }
    return of(new CostoRepuesto());
  }
}

export const costoRepuestoRoute: Routes = [
  {
    path: '',
    component: CostoRepuestoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CostoRepuestos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CostoRepuestoDetailComponent,
    resolve: {
      costoRepuesto: CostoRepuestoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CostoRepuestos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CostoRepuestoUpdateComponent,
    resolve: {
      costoRepuesto: CostoRepuestoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CostoRepuestos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CostoRepuestoUpdateComponent,
    resolve: {
      costoRepuesto: CostoRepuestoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CostoRepuestos'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const costoRepuestoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CostoRepuestoDeletePopupComponent,
    resolve: {
      costoRepuesto: CostoRepuestoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CostoRepuestos'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
