import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MovimientoPresupuesto } from 'app/shared/model/movimiento-presupuesto.model';
import { MovimientoPresupuestoService } from 'app/entities/movimiento-presupuesto/movimiento-presupuesto.service';
import { MovimientoPresupuestoComponent } from 'app/entities/movimiento-presupuesto/movimiento-presupuesto.component';
import { MovimientoPresupuestoDetailComponent } from 'app/entities/movimiento-presupuesto/movimiento-presupuesto-detail.component';
import { MovimientoPresupuestoUpdateComponent } from 'app/entities/movimiento-presupuesto/movimiento-presupuesto-update.component';
import { MovimientoPresupuestoDeletePopupComponent } from 'app/entities/movimiento-presupuesto/movimiento-presupuesto-delete-dialog.component';
import { IMovimientoPresupuesto } from 'app/shared/model/movimiento-presupuesto.model';

@Injectable({ providedIn: 'root' })
export class MovimientoPresupuestoResolve implements Resolve<IMovimientoPresupuesto> {
  constructor(private service: MovimientoPresupuestoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMovimientoPresupuesto> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<MovimientoPresupuesto>) => response.ok),
        map((movimientoPresupuesto: HttpResponse<MovimientoPresupuesto>) => movimientoPresupuesto.body)
      );
    }
    return of(new MovimientoPresupuesto());
  }
}

export const movimientoPresupuestoRoute: Routes = [
  {
    path: '',
    component: MovimientoPresupuestoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MovimientoPresupuestos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MovimientoPresupuestoDetailComponent,
    resolve: {
      movimientoPresupuesto: MovimientoPresupuestoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MovimientoPresupuestos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MovimientoPresupuestoUpdateComponent,
    resolve: {
      movimientoPresupuesto: MovimientoPresupuestoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MovimientoPresupuestos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MovimientoPresupuestoUpdateComponent,
    resolve: {
      movimientoPresupuesto: MovimientoPresupuestoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MovimientoPresupuestos'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const movimientoPresupuestoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: MovimientoPresupuestoDeletePopupComponent,
    resolve: {
      movimientoPresupuesto: MovimientoPresupuestoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MovimientoPresupuestos'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
