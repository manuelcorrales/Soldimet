import { Routes, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { PresupuestosComponent } from 'app/presupuestos/presupuestos.component';
import { NuevoPresupuestoComponent } from 'app/presupuestos/nuevo-presupuesto/nuevo-presupuesto.component';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Injectable } from '@angular/core';
import { Presupuesto } from 'app/shared/model/presupuesto.model';
import { Observable } from 'rxjs';
import { PresupuestoDetailComponent } from 'app/presupuestos/presupuesto-detail/presupuesto-detail.component';
import { PresupuestosService } from 'app/presupuestos/presupuestos.service';

@Injectable({ providedIn: 'root' })
export class PresupuestoResolve implements Resolve<Presupuesto> {
  constructor(private service: PresupuestosService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Presupuesto> {
    const id = route.params['id'];
    if (id) {
      return this.service.getPresupuesto(id);
    }
  }
}

export const PRESUPUESTOS_ROUTES: Routes = [
  {
    path: 'presupuestos',
    data: {
      authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService],
    children: [
      {
        path: '',
        component: PresupuestosComponent,
        resolve: {
          pagingParams: JhiResolvePagingParams,
        },
        data: {
          pageTitle: 'Presupuestos',
          defaultSort: 'id,asc',
        },
      },
      {
        path: 'nuevo',
        component: NuevoPresupuestoComponent,
        data: {
          pageTitle: 'Nuevo Presupuesto',
        },
      },
      {
        path: ':id/ver',
        component: PresupuestoDetailComponent,
        resolve: {
          presupuesto: PresupuestoResolve,
        },
        data: {
          authorities: ['ROLE_USER'],
          pageTitle: 'Presupuesto',
        },
      },
    ],
  },
];
