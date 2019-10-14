import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DetallePresupuesto } from 'app/shared/model/detalle-presupuesto.model';
import { DetallePresupuestoService } from './detalle-presupuesto.service';
import { DetallePresupuestoComponent } from './detalle-presupuesto.component';
import { DetallePresupuestoDetailComponent } from './detalle-presupuesto-detail.component';
import { DetallePresupuestoUpdateComponent } from './detalle-presupuesto-update.component';
import { DetallePresupuestoDeletePopupComponent } from './detalle-presupuesto-delete-dialog.component';
import { IDetallePresupuesto } from 'app/shared/model/detalle-presupuesto.model';

@Injectable({ providedIn: 'root' })
export class DetallePresupuestoResolve implements Resolve<IDetallePresupuesto> {
  constructor(private service: DetallePresupuestoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDetallePresupuesto> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<DetallePresupuesto>) => response.ok),
        map((detallePresupuesto: HttpResponse<DetallePresupuesto>) => detallePresupuesto.body)
      );
    }
    return of(new DetallePresupuesto());
  }
}

export const detallePresupuestoRoute: Routes = [
  {
    path: '',
    component: DetallePresupuestoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DetallePresupuestos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DetallePresupuestoDetailComponent,
    resolve: {
      detallePresupuesto: DetallePresupuestoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DetallePresupuestos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DetallePresupuestoUpdateComponent,
    resolve: {
      detallePresupuesto: DetallePresupuestoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DetallePresupuestos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DetallePresupuestoUpdateComponent,
    resolve: {
      detallePresupuesto: DetallePresupuestoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DetallePresupuestos'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const detallePresupuestoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: DetallePresupuestoDeletePopupComponent,
    resolve: {
      detallePresupuesto: DetallePresupuestoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DetallePresupuestos'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
