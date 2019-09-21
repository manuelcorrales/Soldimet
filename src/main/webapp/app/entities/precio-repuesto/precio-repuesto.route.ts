import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PrecioRepuesto } from 'app/shared/model/precio-repuesto.model';
import { PrecioRepuestoService } from './precio-repuesto.service';
import { PrecioRepuestoComponent } from './precio-repuesto.component';
import { PrecioRepuestoDetailComponent } from './precio-repuesto-detail.component';
import { PrecioRepuestoUpdateComponent } from './precio-repuesto-update.component';
import { PrecioRepuestoDeletePopupComponent } from './precio-repuesto-delete-dialog.component';
import { IPrecioRepuesto } from 'app/shared/model/precio-repuesto.model';

@Injectable({ providedIn: 'root' })
export class PrecioRepuestoResolve implements Resolve<IPrecioRepuesto> {
  constructor(private service: PrecioRepuestoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPrecioRepuesto> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<PrecioRepuesto>) => response.ok),
        map((precioRepuesto: HttpResponse<PrecioRepuesto>) => precioRepuesto.body)
      );
    }
    return of(new PrecioRepuesto());
  }
}

export const precioRepuestoRoute: Routes = [
  {
    path: '',
    component: PrecioRepuestoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PrecioRepuestos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PrecioRepuestoDetailComponent,
    resolve: {
      precioRepuesto: PrecioRepuestoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PrecioRepuestos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PrecioRepuestoUpdateComponent,
    resolve: {
      precioRepuesto: PrecioRepuestoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PrecioRepuestos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PrecioRepuestoUpdateComponent,
    resolve: {
      precioRepuesto: PrecioRepuestoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PrecioRepuestos'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const precioRepuestoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PrecioRepuestoDeletePopupComponent,
    resolve: {
      precioRepuesto: PrecioRepuestoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PrecioRepuestos'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
