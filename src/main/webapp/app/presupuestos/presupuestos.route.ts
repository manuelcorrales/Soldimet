import { Routes, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { PresupuestosComponent } from 'app/presupuestos/presupuestos.component';
import { NuevoPresupuestoComponent } from 'app/presupuestos/nuevo-presupuesto/nuevo-presupuesto.component';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Injectable } from '@angular/core';
import { IPresupuesto, Presupuesto } from 'app/shared/model/presupuesto.model';
import { PresupuestoService } from 'app/entities/presupuesto';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { PresupuestoDetailComponent } from 'app/presupuestos/presupuesto-detail/presupuesto-detail.component';

@Injectable({ providedIn: 'root' })
export class PresupuestoResolve implements Resolve<IPresupuesto> {
  constructor(private service: PresupuestoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPresupuesto> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Presupuesto>) => response.ok),
        map((presupuesto: HttpResponse<Presupuesto>) => presupuesto.body)
      );
    }
  }
}

export const PRESUPUESTOS_ROUTES: Routes = [
  {
    path: 'presupuestos',
    data: {
      authorities: ['ROLE_USER']
    },
    canActivate: [UserRouteAccessService],
    children: [
      {
        path: '',
        component: PresupuestosComponent,
        resolve: {
          pagingParams: JhiResolvePagingParams
        },
        data: {
          pageTitle: 'Presupuestos',
          defaultSort: 'id,asc'
        }
      },
      {
        path: 'nuevo',
        component: NuevoPresupuestoComponent,
        data: {
          pageTitle: 'Nuevo Presupuesto'
        }
      }
    ]
  },
  {
    path: ':id/view',
    component: PresupuestoDetailComponent,
    resolve: {
      presupuesto: PresupuestoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Presupuesto'
    },
    canActivate: [UserRouteAccessService]
  }
];
